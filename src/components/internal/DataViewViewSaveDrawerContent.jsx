import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import styled from "styled-components";
import Snackbar from "../Snackbar";
import DrawerContent from "../DrawerContent.jsx";
import { useMosaicTranslation } from "@root/i18n";

const StyledForm = styled.form`
	& .font16 {
		font-size: 16px;
	}
`;

const InputLabelProps = {
	className: "font16"
}

const inputProps = {
	className: "font16"
}

const classes = {
	label : "font16"
}

function DataViewViewSaveDrawerContent(props) {
	const [state, setState] = useState({
		...props.data,
		type: (props.allowSharedViewSave === true) ? props.data.type : "mine"
	});
	const [isViewDuplicated, setIsViewDuplicated] = useState(false);
	const [snackbarLabel, setSnackbarLabel] = useState('');

	const { t } = useMosaicTranslation();

	const handleClose = (_event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setIsViewDuplicated(false);
		setSnackbarLabel("");
	};

	const onSave = async function() {
		const results = await props.onGetOptions();
		const viewExists = results.find((view) => view.label.toUpperCase() === state.label.toUpperCase());

		if(viewExists) {
			setIsViewDuplicated(true);
			setSnackbarLabel("A view with this name already exists");
			return;
		}

		await props.onSave({
			...state
		});
		props.onClose();
	}
	
	const onSubmit = function(event) {
		event.preventDefault();
		onSave();
	}
	
	const handleChange = name => event => {
		setState({
			...state,
			[name] : event.target.value
		});
	}
	
	const handleSwitch = name => event => {
		setState({
			...state,
			type : event.target.checked ? "shared" : "mine"
		});
	}
	
	return (
		<>
			<DrawerContent
				title={t("mosaic:DataView.save_view")}
				onSave={onSave}
				onClose={props.onClose}
				onCancel={props.onClose}
				background="gray"
			>
				<StyledForm onSubmit={onSubmit} autoComplete="off">
					<FormGroup row>
						<TextField
							autoFocus={true}
							id="label"
							label={t("mosaic:common.label")}
							value={state.label}
							onChange={handleChange("label")}
							fullWidth
							required
							variant="filled"
							InputLabelProps={InputLabelProps}
							inputProps={inputProps}
						/>
					</FormGroup>
					{
						props.allowSharedViewSave &&
						<FormGroup row>
							<FormControl margin="normal">
								<FormControlLabel
									classes={classes}
									control={
										<Switch
											checked={state.type === "shared"}
											onChange={handleSwitch("shared")}
											value="what"
											color="primary"
										/>
									}
									label={t("mosaic:DataView.show_for_all_users")}
								/>
							</FormControl>
						</FormGroup>
					}
				</StyledForm>
			</DrawerContent>
			<Snackbar
				label={snackbarLabel}
				open={isViewDuplicated}
				onClose={handleClose}
			/>
		</>
	)
}

export default DataViewViewSaveDrawerContent;
