import React from "react";
import Paper from "@mui/material/Paper";
import { DropdownListBox, DropdownListPopper } from "./DropdownList.styled";

const DropdownList = React.forwardRef<HTMLUListElement, React.PropsWithChildren<{ anchorEl: HTMLElement }>>(function DropdownList({ children, anchorEl }, ref) {
	return (
		<DropdownListPopper open anchorEl={anchorEl} style={{ width: anchorEl.clientWidth }}>
			<Paper>
				<DropdownListBox ref={ref}>
					{children}
				</DropdownListBox>
			</Paper>
		</DropdownListPopper>
	);
});

export default DropdownList;
