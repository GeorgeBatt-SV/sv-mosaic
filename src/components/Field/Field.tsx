import * as React from "react";
import { ReactElement, memo } from "react";
import { StyledFieldContainer, StyledFieldWrapper, StyledFieldWrapper2 } from "./Field.styled";

import { default as Label } from "./Label";
import { default as HelperText } from "./HelperText";
import { default as InstructionText } from "./InstructionText";
import { MosaicFieldProps } from ".";

const Field = ({
	children,
	error,
	fieldDef,
	colsInRow,
	value,
	id
}: MosaicFieldProps<any>): ReactElement => {

	const errorWithMessage = typeof error === "string" ?  error?.trim().length > 0 : false;
	const shouldRenderError = (errorWithMessage || (errorWithMessage && fieldDef?.required) || (typeof error === "boolean" && error === true));

	// const handleDescriptionRender = () => {
	// 	const container = fieldContainer.current;
	// 	const containerStyle = container && window.getComputedStyle(container);
	// 	const widthcontainer = containerStyle && parseFloat(containerStyle.getPropertyValue("width"));

	// 	const field = fieldRef.current;
	// 	const fieldStyle = field && window.getComputedStyle(field);
	// 	const fieldWidth = fieldStyle && parseFloat(fieldStyle.getPropertyValue("width"));

	// 	setRenderAsTooltip(false);

	// 	if (widthcontainer - fieldWidth > 20 && renderAsTooltip === true) {
	// 		setRenderAsTooltip(false);
	// 	} else {
	// 		if (description.current) {
	// 			const node = description.current;
	// 			const nodeStyle = window.getComputedStyle(node);
	// 			const marginLeft = parseFloat(nodeStyle.getPropertyValue("margin-left"));
	// 			if (marginLeft > 20) {
	// 				setRenderAsTooltip(false);
	// 			} else {
	// 				setRenderAsTooltip(true);
	// 			}
	// 		}
	// 	}
	// };

	// const handleDescriptionDebounced = debounce(handleDescriptionRender, 300);

	// useEffect(() => {
	// 	if (fieldDef?.instructionText)
	// 		if (colsInRow === 1) {
	// 			if (fieldDef?.type === "imageUpload" || fieldDef?.type === "table") {
	// 				setRenderAsTooltip(true);
	// 			} else {
	// 				handleDescriptionDebounced();

	// 				window.addEventListener("resize", handleDescriptionDebounced);

	// 				return () => {
	// 					window.removeEventListener("resize", handleDescriptionDebounced);
	// 				};
	// 			}
	// 		} else {
	// 			setRenderAsTooltip(true);
	// 		}
	// }, []);

	const renderBottomText = () => {
		if (shouldRenderError) {
			return <HelperText error={!!error}>
				{
					typeof error === "string" ? error : undefined
				}
			</HelperText>;
		} else if (fieldDef?.helperText) {
			return <HelperText>{fieldDef?.helperText}</HelperText>;
		}
	};

	const hasLabelComponent =
		(fieldDef?.label && fieldDef?.label?.length > 0) ||
		fieldDef?.inputSettings?.maxCharacters ||
		fieldDef?.instructionText;

	return (
		<StyledFieldContainer id={id} className={fieldDef?.className} style={fieldDef?.style} data-testid="field-test-id">
			<StyledFieldWrapper $error={shouldRenderError} >
				{hasLabelComponent && (
					<Label
						required={fieldDef?.required}
						htmlFor={fieldDef?.name || undefined}
						maxCharacters={fieldDef?.inputSettings?.maxCharacters}
						value={value}
						instructionText={fieldDef?.instructionText}
					>
						{fieldDef?.label}
					</Label>
				)}
				<StyledFieldWrapper2 $size={fieldDef?.size}>
					{children}
				</StyledFieldWrapper2>
				{renderBottomText()}
			</StyledFieldWrapper>
			{fieldDef?.instructionText && colsInRow === 1 &&
				<InstructionText>
					{fieldDef.instructionText}
				</InstructionText>
			}
		</StyledFieldContainer>
	);
};

export default memo(Field);
