import styled from "styled-components";
import { StyledProps } from "@root/types";
import { CONTAINERS } from "@root/theme/theme";
import { ColPropsTypes } from "./ColTypes";

export const StyledCol = styled.div<StyledProps<ColPropsTypes, "colsInRow">>`
	display: flex;
	flex-direction: column;
	position: relative;
	gap: 24px;

	container-type: inline-size;
	container-name: ${CONTAINERS.FORM_COL};
`;
