import * as React from "react";
import { ElementType, memo, useMemo } from "react";
import styled from "styled-components";

import FormFieldText from "@root/forms/FormFieldText";
import FormFieldCheckbox from "@root/forms/FormFieldCheckbox";
import FormFieldChipSingleSelect from "@root/forms/FormFieldChipSingleSelect";
import FormFieldDropdownSingleSelection from "@root/forms/FormFieldDropdownSingleSelection";
import FormFieldPhoneSelectionDropdown from "@root/forms/FormFieldPhoneSelectionDropdown";
import FormFieldRadio from "@root/forms/FormFieldRadio";
import FormFieldToggleSwitch from "@root/forms/FormFieldToggleSwitch";
import { FieldDef } from "@root/components/Field";
import FormFieldImageVideoLinkDocumentBrowsing from "@root/forms/FormFieldImageVideoLinkDocumentBrowsing";
import FormFieldColorPicker from "@root/forms/FormFieldColorPicker";
import FormFieldDate from "@root/forms/FormFieldDate/DateField";
import FormFieldAddress from "@root/forms/FormFieldAddress";
import FormFieldTable from "@root/forms/FormFieldTable";
import FormFieldTextEditor from "@root/forms/FormFieldTextEditor";
import FormFieldAdvancedSelection from "@root/forms/FormFieldAdvancedSelection";
import FormFieldMapCoordinates from "@root/forms/FormFieldMapCoordinates";
import FormFieldImageUpload from "@root/forms/FormFieldImageUpload";
import FormFieldMatrix from "@root/forms/FormFieldMatrix";
import FormFieldUpload from "@root/forms/FormFieldUpload";
import { Sizes } from "@root/theme";
import FormFieldNumberTable from "@root/forms/FormFieldNumberTable";
import evaluateShow from "@root/utils/show/evaluateShow";
import Blank from "@root/components/Blank";
import RegisteredField from "../Field/RegisteredField";
import { Controller, useWatch } from "react-hook-form"
import { createValidationChain } from "./validators";
import { UseFormNewReturn } from "./FormTypes";

const StyledCol = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% / ${pr => pr.colsInRow});
`;

interface ColPropsTypes {
	col: (string | FieldDef)[];
	// TODO Use something other than any
	state: any;
	fieldsDef: FieldDef[];
	dispatch: any;
	colsInRow?: number;
	colIdx?: number;
	rowIdx?: number;
	sectionIdx?: number;
	methods?: UseFormNewReturn
}

function FieldWithWatcher({component: Component, ...props}: any) {
	const sourceValue = useWatch({
		name: props.fieldDef.copy,
		control: props.methods.control
	});

	return (
		<Component
			{...props}
			value={sourceValue}
		/>
	)
}

const Col = (props: ColPropsTypes) => {
	const {
		col,
		state,
		fieldsDef,
		dispatch,
		colsInRow,
		colIdx,
		rowIdx,
		sectionIdx,
		methods,
	} = props;

	const componentMap = useMemo(() => ({
		text: FormFieldText,
		checkbox: FormFieldCheckbox,
		chip: FormFieldChipSingleSelect,
		dropdown: FormFieldDropdownSingleSelection,
		phone: FormFieldPhoneSelectionDropdown,
		radio: FormFieldRadio,
		toggleSwitch: FormFieldToggleSwitch,
		imageVideoDocumentLink: FormFieldImageVideoLinkDocumentBrowsing,
		color: FormFieldColorPicker,
		date: FormFieldDate,
		address: FormFieldAddress,
		table: FormFieldTable,
		textEditor: FormFieldTextEditor,
		advancedSelection: FormFieldAdvancedSelection,
		mapCoordinates: FormFieldMapCoordinates,
		imageUpload: FormFieldImageUpload,
		matrix: FormFieldMatrix,
		upload: FormFieldUpload,
		numberTable: FormFieldNumberTable
	}), []);



	/* const onBlurMap = useMemo(() => {
		return fieldsDef.reduce((prev, curr) => {
			prev[curr.name] = async function () {
				await dispatch(
					formActions.validateField({ name: curr.name })
				);

				if (curr.pairedFields)
					curr.pairedFields.forEach(async pairedField => {
						await dispatch(
							formActions.validateField({ name: pairedField })
						);
					});
			};

			return prev;
		}, {});
	}, [fieldsDef, state.pairedFields]); */

	return (
		<StyledCol colsInRow={colsInRow}>
			{col.map((field, i) => {
				const currentField: FieldDef = fieldsDef?.find(
					(fieldDef) => {
						return field === fieldDef.name;
					}
				);

				if (!currentField) {
					throw new Error(`No field declared for field name '${field}' in section ${sectionIdx}, row ${rowIdx}, column ${colIdx}.`);
				}

				const { type, ...fieldProps } = currentField;

				const Component: ElementType = typeof type === "string" ? componentMap[type] : type;

				if (!Component) {
					throw new Error(`Invalid type ${type}`);
				}

				// const onBlur = onBlurMap[fieldProps.name];

				const name = fieldProps.name;
				const ref = fieldProps.ref;
				const value = state?.data[fieldProps.name];

				let maxSize: Sizes | string;
				const SizeSelected = Sizes[currentField?.size] ? Sizes[currentField?.size] : currentField?.size;

				if (currentField?.size)
					switch (colsInRow) {
					case 1:
						maxSize = SizeSelected <= Sizes.lg ? SizeSelected : Sizes.lg;
						break;
					case 2:
						maxSize = SizeSelected <= Sizes.md ? SizeSelected : Sizes.md;
						break;
					case 3:
						maxSize = SizeSelected <= Sizes.sm ? SizeSelected : Sizes.sm;
						break;
					default:
						break;
					}

				const shouldRenderEmptyField = value === undefined && currentField.disabled
				const shouldShow = useMemo(() => evaluateShow(currentField.show, {data: state?.data}), [currentField.show, state?.data]);

				if (!shouldShow) {
					return null;
				}

				return (
					<Controller
						key={name}
						control={methods.control}
						name={name}
						rules={{
							required: fieldProps.required ? "This is a required field" : false,
							validate: fieldProps.validators && ((value, data) => {
								if (fieldProps.pairedFields) {
									methods.pairedValidation([name, ...fieldProps.pairedFields]);
								}

								return createValidationChain(fieldProps.validators)(value, data);
							})
						}}
						render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
							const errorMessage = error ? error.message : false;

							const children = currentField.copy ? (
								<FieldWithWatcher
									fieldDef={{ ...currentField, size: maxSize, name }}
									name={name}
									value={value}
									error={errorMessage}
									onChange={onChange}
									ref={ref}
									onBlur={onBlur}
									key={`${name}_${i}`}
									methods={methods}
									component={Component}
								/>
							) : (
								<Component
									fieldDef={{ ...currentField, size: maxSize, name }}
									name={name}
									value={value}
									error={errorMessage}
									onChange={onChange}
									ref={ref}
									onBlur={onBlur}
									key={`${name}_${i}`}
									methods={methods}
								/>
							);

							if (typeof type === "string" && componentMap[type]) {
								return (
									<RegisteredField
										key={`${name}_${i}`}
										fieldDef={{ ...currentField, size: maxSize }}
										value={value}
										error={errorMessage}
										colsInRow={colsInRow}
										id={name}
										name={name}
										dispatch={dispatch}
									>
										{shouldRenderEmptyField ? <Blank /> : children}
									</RegisteredField>
								);
							}

							return <>{shouldRenderEmptyField ? <Blank /> : children}</>
						}}
					/>
				)

				// return shouldShow && (
				// 	typeof type === "string" && componentMap[type] ? (
				// 		<RegisteredField
				// 			key={`${name}_${i}`}
				// 			fieldDef={{ ...currentField, size: maxSize }}
				// 			value={value}
				// 			error={error}
				// 			colsInRow={colsInRow}
				// 			id={name}
				// 			name={name}
				// 			dispatch={dispatch}
				// 		>
				// 			{shouldRenderEmptyField ? <Blank /> : children}
				// 		</RegisteredField>
				// 	) : (
				// 		shouldRenderEmptyField ? <Blank /> : children
				// 	)
				// );
			})}
		</StyledCol>
	);
};

export default memo(Col);
