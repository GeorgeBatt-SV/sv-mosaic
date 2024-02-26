import styled from "styled-components";
import Sizes from "@root/theme/sizes";
import { StyledTextField } from "@root/components/Field/FormFieldText/FormFieldText.styled";
import Button from "@root/components/Button";

export const StyledContents = styled.div`
	& > .inputRow {
		display: flex;
		align-items: center;
		padding: 16px 16px 0;
	}

	.MuiFormControl-root {
		margin-bottom: 0;
		margin-top: 0;
	}

	& > .inputRow > .disabled {
		margin-top: 8px;
		padding: 12px 16px 12px 8px;
		width: ${Sizes.sm};
	}

	& .comparisonContainer {
		border-left: 1px solid #ccc;
		margin: 5px;
		padding-left: 5px;
		flex-shrink: 0;
	}
`;

export const StyledFilterButton = styled(Button)`
	&& {
		position: relative;
		z-index: 1;
	}
`;

export const StyledFilterTextField = styled(StyledTextField)`
	&& {
		margin-left: -1px;

		.Mui-focused fieldset,
		fieldset:hover {
			z-index: 1;
		}
	}
`;
