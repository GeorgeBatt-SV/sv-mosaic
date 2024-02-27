import { useRef, useCallback, useMemo, useReducer } from "react";
import {
	FieldCanBeValidated,
	FormStable,
	FormMethods,
	GetFieldError,
	GetFieldErrors,
	FormHandleSubmit,
	SetFieldBlur,
	SetFieldValue,
	SubmitForm,
	UseFormReturn,
	ValidateField,
	SetFormValues,
	DisableForm,
	AddWait,
	RemoveWait,
	FormWait,
	MountField,
	AddValidator,
	FormInit,
	FormReset,
} from "./types";
import { getToggle, wrapToggle } from "@root/utils/toggle";
import { MosaicObject } from "@root/types";
import { FieldDefSanitized } from "../../Field";
import { getFieldConfig } from "../Col/fieldConfigMap";
import { initialState, initialStable } from "./initial";
import { reducer } from "./reducers";
import { cleanValue, mapsValidators, runValidators, stateFromStable } from "./utils";

export function useForm(): UseFormReturn {
	const stable = useRef<FormStable>({ ...initialStable });

	const [state, dispatch] = useReducer(reducer, initialState);

	const getFieldFromExtra = useCallback((name: string) => {
		if (!stable.current.fields[name]) {
			throw new Error(`Field \`${name}\` is not registered with this form. Registered fields: ${Object.keys(stable.current.fields).map(name => `\`${name}\``).join(", ")}`);
		}

		return stable.current.fields[name];
	}, []);

	const getFieldError = useCallback<GetFieldError>(async ({
		name,
	}) => {
		const { data, internalValidators } = stable.current;
		const field = getFieldFromExtra(name);

		const requiredFlag = field.required;
		const validators = field.validators || [];

		if (requiredFlag) {
			validators.unshift({ fn: "required", options: {} });
		}

		if (field.type === "phone") {
			validators.push({ fn: "validatePhoneNumber", options: {} });
		}

		if (field.inputSettings?.maxCharacters > 0) {
			validators.push({
				fn: "validateCharacterCount",
				options: { max: field.inputSettings.maxCharacters },
			});
		}

		if (field.inputSettings?.minDate || field.inputSettings?.maxDate) {
			validators.push({
				fn: "validateMinDate",
				options: {
					min: field.inputSettings?.minDate,
					max: field.inputSettings?.maxDate,
				},
			});
		}

		const validatorsMap = mapsValidators([
			...(internalValidators[name] || []),
			...validators,
		]);

		const result = await runValidators(validatorsMap, data[name], data);

		if (!result) {
			return undefined;
		}

		return result.errorMessage;
	}, [getFieldFromExtra]);

	const getFieldErrors = useCallback<GetFieldErrors>(async ({
		names,
	}) => {
		const list = await Promise.all(names.map(async name => {
			const error = await getFieldError({ name });

			return {
				name,
				error,
			};
		}));

		const errors = list
			.reduce((acc, { name, error }) => ({
				...acc,
				[name]: error,
			}), {});

		const count = Object.values(errors).filter(Boolean).length;

		return { errors, count };
	}, [getFieldError]);

	const fieldCanBeValidated = useCallback<FieldCanBeValidated>(({
		name,
	}) => {
		const { mounted } = stable.current;

		if (!mounted[name]) {
			return false;
		}

		const field = getFieldFromExtra(name);

		const disabledWrapped = wrapToggle(field.disabled, stateFromStable(stable.current), false);
		const disabled = getToggle(disabledWrapped);

		if (disabled) {
			return false;
		}

		return true;
	}, [getFieldFromExtra]);

	const validateField = useCallback<ValidateField>(async ({
		name,
		validateLinkedFields,
	}) => {
		const field = getFieldFromExtra(name);

		const errors: MosaicObject<string | undefined> = {
			[name]: !fieldCanBeValidated({ name }) ? undefined : (await getFieldError({ name })),
		};

		if (validateLinkedFields && field.validates) {
			const linkedFieldNames = field.validates.filter(name => fieldCanBeValidated({ name }));
			const { errors: linkedFieldErrors } = await getFieldErrors({ names: linkedFieldNames });

			Object.assign(errors, linkedFieldErrors);
		}

		stable.current.errors = errors;

		dispatch({
			type: "SET_FIELD_ERRORS",
			errors,
			merge: true,
		});
	}, [fieldCanBeValidated, getFieldError, getFieldErrors, getFieldFromExtra]);

	const setFormValues = useCallback<SetFormValues>(({
		values,
		initial,
	}) => {
		const internalValues = Object.keys(values).reduce((acc, curr) => ({
			...acc,
			[curr]: getFieldFromExtra(curr).getResolvedValue(values[curr]).internalValue,
		}), {});

		stable.current.data = { ...values };

		if (initial) {
			stable.current.initialData = { ...values };
		}

		return dispatch({
			type: "FIELDS_ON_CHANGE",
			value: values,
			internalValue: internalValues,
			clearErrors: true,
		});
	}, [getFieldFromExtra]);

	const init = useCallback<FormInit>(({
		fields,
	}) => {
		stable.current.fields = fields.reduce<Record<string, FieldDefSanitized>>((prev, field) => {
			const fieldConfig = getFieldConfig(field.type);
			const valueResolver = field.getResolvedValue || fieldConfig.getResolvedValue;

			const result: FieldDefSanitized = {
				...field,
				validateOn: field.validateOn || fieldConfig.validate,
				getResolvedValue: (value) => valueResolver(value, field),
			};

			return {
				...prev,
				[field.name]: result,
			};
		}, {});
	}, []);

	const reset = useCallback<FormReset>(() => {
		const values = { ...stable.current.initialData };
		const internalValues = Object.keys(values).reduce((acc, curr) => ({
			...acc,
			[curr]: getFieldFromExtra(curr).getResolvedValue(values[curr]).internalValue,
		}), {});

		stable.current = {
			...initialStable,
			data: values,
			internalData: internalValues,
		};

		dispatch({
			type: "RESET",
			data: values,
			internalData: internalValues,
		});
	}, [getFieldFromExtra]);

	const setFieldValue = useCallback<SetFieldValue>(({
		name,
		value: providedValue,
		touched,
		validate,
	}) => {
		const { errors, data, hasBlurred } = stable.current;
		const field = getFieldFromExtra(name);

		const providedValueResolved = typeof providedValue === "function" ? providedValue(data[name]) : providedValue;
		const { internalValue, value } = field.getResolvedValue(providedValueResolved);

		stable.current.data[name] = value;

		dispatch({
			type: "FIELD_ON_CHANGE",
			name,
			internalValue,
			value: cleanValue(value),
			touched,
		});

		if (validate || field.validateOn === "onChange") {
			validateField({
				name,
				validateLinkedFields: true,
			});
		}

		if (
			field.validateOn === "onBlurChange" &&
			hasBlurred[name]
		) {
			validateField({
				name,
				validateLinkedFields: true,
			});
		}

		if (
			field.validateOn === "onBlurAmend" &&
			hasBlurred[name] &&
			errors[name]
		) {
			delete stable.current.hasBlurred[name];
			dispatch({
				type: "FIELD_UNVALIDATE",
				name,
				value: "",
			});
		}
	}, [getFieldFromExtra, validateField]);

	const setFieldBlur = useCallback<SetFieldBlur>(({
		name,
	}) => {
		const field = getFieldFromExtra(name);
		stable.current.hasBlurred[name] = true;

		if (
			field.validateOn === "onBlur" ||
			field.validateOn === "onBlurAmend" ||
			field.validateOn === "onBlurChange"
		) {
			validateField({
				name,
				validateLinkedFields: true,
			});
		}
	}, [getFieldFromExtra, validateField]);

	const disableForm = useCallback<DisableForm>(({
		disabled,
	}) => {
		dispatch({
			type: disabled ? "FORM_START_DISABLE" : "FORM_END_DISABLE",
			value: disabled,
		});
	}, []);

	const submitForm = useCallback<SubmitForm>(async () => {
		const { data, fields, waits } = stable.current;

		const names = Object.entries(fields)
			.map(([, field]) => field.name)
			.filter(name => fieldCanBeValidated({ name }));

		const { count, errors } = await getFieldErrors({ names });

		if (count) {
			stable.current.errors = errors;

			dispatch({
				type: "SET_FIELD_ERRORS",
				errors,
			});

			// TODO This sucks. Use references instead.

			// if (!validForm && firstInvalidField !== undefined) {
			// 	setTimeout(() => {
			// 		document.getElementById(firstInvalidField)?.scrollIntoView({ behavior: "smooth", block: "start" });
			// 	}, 500);
			// }

			return {
				valid: false,
				data: null,
			};
		}

		if (waits.length > 0) {
			dispatch({
				type: "SET_SUBMIT_WARNING",
				value: {
					lead: "The form cannot be submitted at this time:",
					reasons: waits.map(({ message }) => message),
				},
			});

			return {
				valid: false,
				data: null,
			};
		}

		const activeFields = Object.keys(fields).filter(name => fieldCanBeValidated({ name }));
		const activeDataList = activeFields.map(name => ({
			name,
			value: data[name],
		}));

		const cleanData = activeDataList.reduce((acc, { name, value }) => ({
			...acc,
			[name]: value,
		}), {});

		stable.current.hasBlurred = Object.keys(fields).reduce((prev, curr) => ({
			...prev,
			[curr]: true,
		}), {});

		return {
			valid: true,
			data: cleanData,
		};
	}, [fieldCanBeValidated, getFieldErrors]);

	const removeWait = useCallback<RemoveWait>(({
		names,
	}) => {
		const { waits } = stable.current;
		const newWaits: FormWait[] = waits.filter(({ name }) => !names.includes(name));

		stable.current.waits = newWaits;

		dispatch({
			type: "SET_FORM_WAITS",
			waits: newWaits,
		});
	}, []);

	const addWait = useCallback<AddWait>(({
		name,
		message,
		disableForm = false,
	}) => {
		const { waits } = stable.current;
		const newWaits: FormWait[] = [
			...waits,
			{
				name,
				message,
				disableForm,
			},
		];

		stable.current.waits = newWaits;

		dispatch({
			type: "SET_FORM_WAITS",
			waits: newWaits,
		});

		return {
			remove: (params = {}) => removeWait({
				names: [name],
				...params,
			}),
		};
	}, [removeWait]);

	const mountField = useCallback<MountField>(({ name }) => {
		stable.current.mounted[name] = true;

		return {
			unmount: () => {
				stable.current.mounted[name] = false;

				dispatch({
					type: "SET_FIELD_ERRORS",
					errors: { [name]: undefined },
					merge: true,
				});
			},
		};
	}, []);

	const addValidator = useCallback<AddValidator>(({
		name,
		validator,
	}) => {
		const current = stable.current.internalValidators[name] || [];

		/**
		 * Just bail if this validator is already registered
		 */
		if (current.includes(validator)) {
			return;
		}

		stable.current.internalValidators[name] = [
			...current,
			validator,
		];

		return {
			remove: () => {
				const current = stable.current.internalValidators[name] || [];

				/**
				 * Just bail if this validator isn't registered
				 */
				if (!current.includes(validator)) {
					return;
				}

				stable.current.internalValidators[name] = current.filter(item => item !== validator);
			},
		};
	}, []);

	const methods = useMemo<FormMethods>(() => ({
		setFormValues,
		setFieldValue,
		setFieldBlur,
		submitForm,
		disableForm,
		addWait,
		removeWait,
		mountField,
		addValidator,
		init,
		reset,
	}), [
		setFieldBlur,
		setFormValues,
		setFieldValue,
		submitForm,
		disableForm,
		addWait,
		removeWait,
		mountField,
		addValidator,
		init,
		reset,
	]);

	const handleSubmit = useCallback<FormHandleSubmit>((onSuccess, onError) => async () => {
		const { data, valid } = await submitForm();

		if (!valid) {
			onError && onError(data);
			return;
		}

		onSuccess(data);
	}, [submitForm]);

	return {
		state,
		methods,
		handleSubmit,
	};
}