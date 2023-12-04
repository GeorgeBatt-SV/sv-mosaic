import styled from "styled-components";
import theme from "@root/theme";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const TableRow = styled.tr<{ $isDragOverlay?: boolean}>`
	${({ $isDragOverlay }) => $isDragOverlay && `
		background: rgba(255,255,255,.9);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		position: relative;
		outline: 1px solid #ddd;
		outline-offset: -1px;
		z-index: 1;
	`}

	&.checked {
		background-color: ${theme.newColors.grey1["100"]};
	}
`

export const TableRowDragHandle = styled(DragIndicatorIcon)`
	cursor: grab;
`
