import React, { memo, useMemo } from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import ButtonRow from "../ButtonRow.jsx";
import Button from "../Button.jsx";

function GridActionsButtonRow(props) {
	const primaryActions = useMemo(() => {
		if (props.primaryActions === undefined) { return null; }
		
		return props.primaryActions.map((action, i) => {
			const onClick = () => {
				action.onClick({ data : props.row });
			}
			
			return (
				<Button
					key={`primary_${i}`}
					{ ...action }
					onClick={onClick}
				/>
			)
		});
	}, [props.primaryActions, props.row]);
	
	const additionalActions = useMemo(() => {
		if (props.additionalActions === undefined) { return null; }
		
		return (
			<Button
				key="additional"
				color="blue"
				variant="icon"
				mIcon={MoreHorizIcon}
				menuItems={props.additionalActions.map(action => {
					return {
						...action,
						onClick : () => {
							action.onClick({
								data : props.row
							});
						}
					}
				})}
			/>
		)
	}, [props.additionalActions, props.row]);
	
	// concat the buttons into a single row so that we have a single child allowing caching of the ButtonRow
	const buttons = useMemo(() => {
		return [
			...primaryActions,
			additionalActions
		];
	}, [primaryActions, additionalActions]);
	
	return (
		<ButtonRow>
			{buttons}
		</ButtonRow>
	)
}

export default memo(GridActionsButtonRow);