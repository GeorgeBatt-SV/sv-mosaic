import * as React from 'react';
import { ReactElement, HTMLAttributes } from 'react';

// Types and styles
import { RadioButtonProps } from './RadioButtonTypes';
import {
	StyledRadioButton,
	StyledFormControlLabel,
} from './RadioButton.styles';

const RadioButton = (
	props: RadioButtonProps & HTMLAttributes<HTMLInputElement>
): ReactElement => {
	const { label, required, disabled, value } = props;

	return (
		<StyledFormControlLabel
			label={label}
			labelPlacement='end'
			value={value}
			disabled={disabled}
			control={
				<StyledRadioButton
					data-testid="radio-button-test"
					disabled={disabled}
					required={required}
				/>
			}
		/>
	);
};

export default RadioButton;
