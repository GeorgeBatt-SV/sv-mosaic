import * as React from "react";
import styled from "styled-components";

// Material UI
import TextField from "@mui/material/TextField";

//Styles & Types
import theme, { Sizes } from "@root/theme";

export const StyledTextField = styled(({ fieldSize, ...rest }) => (
	<TextField {...rest} />
))`
	width: ${pr => pr.fieldSize ? pr.fieldSize : Sizes.sm};

	&.MuiFormControl-root {
		background-color: ${theme.newColors.grey1["100"]};
		&:hover {
			background-color: ${theme.newColors.grey2["100"]};
			& fieldset {
				border-color: ${theme.newColors.simplyGrey["100"]};
			}
		}

		& svg {
			color: ${theme.newColors.almostBlack["100"]};
		}
	}

	.MuiOutlinedInput-input {
		padding: 12px 14px;
		line-height: 20px;
		font-size: 15px;
		height: 43px;
		box-sizing: border-box;
		color: ${theme.newColors.almostBlack["100"]};
		font-family: ${theme.fontFamily};
		font-weight: 400;

		::placeholder {
			font-weight: ${theme.fontWeight.normal};
			color: ${theme.newColors.grey3["100"]};
			opacity: 1;
		}
	}

	.MuiInputAdornment-root + .MuiOutlinedInput-input{
		padding-left: 0;
	}

	.MuiInputBase-multiline{
		padding: 0;
	}

	.MuiFormHelperText-contained {
		font-family: ${theme.fontFamily};
		margin-top: ${pr => pr.error ? "9px" : "7px"};
		margin-left: 0;
		word-break: break-all;
	}


	.MuiFormHelperText-root.Mui-error {
		color: ${theme.newColors.darkRed["100"]}
	}

	fieldset {
		border-radius: 0px;
		border-color: ${theme.newColors.simplyGrey["100"]};
	}

	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
		border-color: ${theme.newColors.almostBlack["100"]};
		border-width: 1px;
		box-shadow: ${theme.fieldSpecs.inputText.shadow};
		}
	}

	.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
		border-color: ${pr => pr.error ? theme.newColors.darkRed["100"] : "transparent"};
	}
`;
