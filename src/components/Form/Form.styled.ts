import styled from "styled-components";
import { CONTAINERS } from "@root/theme/theme";
import SideNav from "../SideNav/SideNav";
import { containerQuery } from "@root/utils/css";
import { FormSpacing } from "./FormTypes";

export const StyledContainerForm = styled.div<{$fullHeight?: boolean}>`
	position: relative;
	display: flex;
	flex-direction: column;

	&.disabled {
		opacity: .5;
		pointer-events: none;
	}

	container-type: inline-size;
	container-name: ${CONTAINERS.FORM};

	${({ $fullHeight = true }) => $fullHeight && `
		height: 100%;
	`}
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	flex: 1 1 0%;
	min-height: 0;
`;

export const StyledFormContent = styled.div<{ $spacing?: FormSpacing }>`
	overflow-y: auto;
	flex-grow: 1;
	min-width: 0;
	padding: ${({ $spacing }) => $spacing === "compact" ? "16px" : "24px"};
`;

export const StyledFormPrimary = styled.div`
	flex-grow: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;

	${containerQuery("xl", "FORM")} {
		flex-direction: row;
	}
`

export const StyledSideNav = styled(SideNav)`
	display: none;
	margin-top: 10px;

	${containerQuery("sm", "FORM")} {
		display: block;
	}

	${containerQuery("xl", "FORM")} {
		margin-top: 0;
	}
`;
