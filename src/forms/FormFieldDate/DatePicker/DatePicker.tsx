import * as React from "react";
import { ReactElement, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { DatePickerProps } from ".";

// Styles
import {
	DatePickerWrapper,
	popperSx,
} from "./DatePicker.styled";

const DateFieldPicker = (props: DatePickerProps): ReactElement => {
	const { error, fieldDef, onChange, value, onBlur, blurOnAccept } = props;

	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const handleOpenState = () => {
		setIsPickerOpen(!isPickerOpen);

		if (isPickerOpen && onBlur) {
			onBlur();
		}
	};

	const renderInput = (params) => (
		<TextField
			{...params}
			onBlur={onBlur}
			required={fieldDef.required}
			inputProps={{
				...params.inputProps,
				placeholder: fieldDef?.inputSettings?.placeholder,
			}}
		/>
	);

	// There must be a better way
	const onAccept = React.useCallback(() => blurOnAccept ? setTimeout(() => onBlur(), 10) : undefined, [blurOnAccept, onBlur]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePickerWrapper data-testid="date-picker-test-id" error={!!error} isPickerOpen={isPickerOpen}>
				<DatePicker
					onAccept={onAccept}
					renderInput={renderInput}
					inputFormat="MM/dd/yyyy"
					value={value}
					onChange={onChange}
					onOpen={handleOpenState}
					onClose={handleOpenState}
					PopperProps={{
						sx: popperSx,
					}}
				/>
			</DatePickerWrapper>
		</LocalizationProvider>
	);
};

export default DateFieldPicker;
