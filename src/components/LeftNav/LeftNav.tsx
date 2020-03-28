import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";

import { LeftNavProps } from "./LeftNavTypes";
import LeftNavItem from "./LeftNavItem";
import LeftNavGroup from "./LeftNavGroup";

const StyledDiv = styled.div`
	background: #2e2e31;
	width: 250px;
	flex: 1;
`;

function LeftNav(props: LeftNavProps) {
	const zIndex = props.zIndex !== undefined ? props.zIndex : 100;

	const [state, setState] = useState({
		openName : undefined
	});

	const onOpen = (name) => {
		setState({
			...state,
			openName : name
		})
	}

	const onClose = function() {
		setState({
			...state,
			openName : undefined
		});

		props.onClose();
	}

	const children = props.items.map(item => {
		const Component = item.type === "group" ? LeftNavGroup : LeftNavItem;

		return (
			<Component
				key={item.name}
				item={item}
				openName={state.openName}
				onOpen={onOpen}
				onNav={props.onNav}
				zIndex={zIndex}
			/>
		)
	});

	return (
		<Drawer
			anchor="left"
			open={props.open}
			onClose={onClose}
			ModalProps={{ disableEnforceFocus : true }}
			style={{ zIndex }}
		>
			<StyledDiv>
				{children}
			</StyledDiv>
		</Drawer>
	)
}

export default LeftNav;