import theme from "@root/theme";
import styled from "styled-components";

// Types
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { StyledProps } from "@root/types";
import { containerQuery } from "@root/utils/css";
import { SectionPropTypes } from "./SectionTypes";

export const StyledAccordion = styled(Accordion)<StyledProps<SectionPropTypes, "title">>`
	box-shadow: none !important;
	border-radius: 0px;
	scroll-margin-top: 60px;
	margin: 0 !important;

	${({ $title }) => $title ? `
		border: 1px solid ${theme.newColors.grey2["100"]};
		margin: 0px 0px 40px 0px;
	` : `
		border: 0;
		margin: 0;
	`}

	&:before {
		content: none !important;
	}
`;

export const StyledSectionHeader = styled(AccordionSummary)`
	background-color: ${theme.newColors.grey2["100"]} !important;
	margin: 0px !important;
	padding: 12px 24px !important;
	min-height: 0px !important;
	color: ${theme.newColors.grey4["100"]} !important;

	& :first-child {
		margin: 0px !important;
	}
`;

export const StyledSectionContent = styled(AccordionDetails)`
	padding: 0px !important;
	margin: 0px !important;
`;

export const StyledDescription = styled.p`
	font-size: 16px;
	font-family: ${theme.fontFamily};
	color: ${theme.newColors.grey3["100"]};
	margin: 18px 0 0;
	padding: 0 20px;

	${containerQuery("lg", "FORM")} {
		margin-top: 32px;
		padding: 0 40px;
	}
`;

export const StyledRows = styled.div<StyledProps<SectionPropTypes, "title">>`
	margin: 0px;
	display: grid;
	grid-template-columns: repeat(1,minmax(0,1fr));
	gap: 24px 0;

	${({ $title }) => $title && `
		padding: 18px 20px;

		${containerQuery("lg", "FORM")} {
			padding: 32px 40px;
		}
	`}
`;

export const StyledTitle = styled.h2`
	font-size: 20px;
	font-family: ${theme.fontFamily};
	font-weight: 500;
	margin: 0px;
`;
