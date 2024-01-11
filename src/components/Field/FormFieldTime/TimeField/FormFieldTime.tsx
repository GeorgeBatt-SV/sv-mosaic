import * as React from "react";
import { ReactElement, memo } from "react";

// Components
import TimePicker from "../TimePicker";

// Styles
import { MosaicFieldProps } from "@root/components/Field";
import { TimeFieldInputSettings, TimeData } from "./TimeFieldTypes";
import { textIsValidDate } from "@root/utils/date";
import { TIME_FORMAT_FULL, TIME_FORMAT_FULL_PLACEHOLDER } from "@root/constants";
import { INVALID_TIME } from "@root/components/Form/fieldErrors";
import { useFieldErrors } from "@root/utils/hooks";

const FormFieldTime = (props: MosaicFieldProps<"time", TimeFieldInputSettings, TimeData>): ReactElement => {
	const {
		fieldDef,
		onChange,
		value = {
			validTime: false
		},
		onBlur,
		error,
		dispatch
	} = props;

	const { addError, removeError } = useFieldErrors({
		dispatch,
		name: fieldDef.name
	});

	const handleTimeChange = async (time: Date, keyboardInputValue?: string) => {
		const isKeyboardEvent = keyboardInputValue !== undefined;
		const validKeyboardInput = textIsValidDate(keyboardInputValue, TIME_FORMAT_FULL);

		if (isKeyboardEvent && !validKeyboardInput) {
			// This handler was caused by keyboard input, but it's not a valid date
			addError(INVALID_TIME);

			onChange({
				...value,
				time,
				validTime: false
			});

			return;
		} else {
			removeError([INVALID_TIME]);

			onChange({
				...value,
				time,
				validTime: true
			});
		}
	}

	return (
		<TimePicker
			error={error}
			onChange={handleTimeChange}
			fieldDef={{
				name: fieldDef?.name,
				label: "",
				type: "timePicker",
				inputSettings: {
					placeholder: TIME_FORMAT_FULL_PLACEHOLDER
				},
				disabled: fieldDef?.disabled
			}}
			value={value?.time}
			onBlur={onBlur}
		/>
	);
};

export default memo(FormFieldTime);
