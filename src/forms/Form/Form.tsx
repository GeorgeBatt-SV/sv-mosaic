import * as React from "react";
import { memo, useEffect } from "react";
import { StyledDisabledForm, StyledForm } from "./Form.styled";
import { FormProps } from "./FormTypes";
import { formActions } from "./formActions";
import FormLayout from "./FormLayout";
import TopComponent from "../TopComponent";
import { FormContent, Row } from "../TopComponent/TopComponent.styled";
import FormNav from "../FormNav";
import { useWindowResizer } from "@root/utils/useWindowResizer";
import { MosaicObject } from "@root/types";
import Dialog from "../../components/Dialog/Dialog";

const Form = (props: FormProps) => {
	const {
		type,
		state,
		title,
		fields,
		sections,
		dispatch,
		onCancel,
		dialogOpen,
		description,
		getFormValues,
		cancelButtonAttrs,
		submitButtonAttrs,
		handleDialogClose,
	} = props;

	const { view } = useWindowResizer(type);

	useEffect(() => {
		const loadFormValues = async () => {
			let values: MosaicObject;

			if (getFormValues) {
				values = await getFormValues();
			} else {
				fields.forEach(field => {
					if (field.defaultValue) {
						values = {
							...values,
							[field.name]: field.defaultValue
						};
					}
				});
			}

			if (values)
				await dispatch(
					formActions.setFormValues({
						values
					})
				);
		}

		loadFormValues();
	}, [getFormValues]);

	const submit = async (e) => {
		e.preventDefault();
		await dispatch(
			formActions.submitForm()
		);
	}

	const cancel = async (e) => {
		e.preventDefault();
		onCancel && (await onCancel());
	}

	return (
		<>
			<div style={{ position: "relative" }}>
				{state.disabled &&
					<StyledDisabledForm />
				}
				<StyledForm>
					{title &&
						<TopComponent
							title={title}
							type={type}
							description={description}
							onSubmit={(e) => submit(e)}
							submitButtonAttrs={submitButtonAttrs}
							onCancel={onCancel ? (e) => cancel(e) : null}
							cancelButtonAttrs={cancelButtonAttrs}
							sections={sections}
							view={view}
						/>
					}
					{view === "BIG_DESKTOP" ? (
						<Row>
							{sections &&
								<FormNav sections={sections} />
							}
							<FormContent view={view}>
								<FormLayout
									state={state}
									dispatch={dispatch}
									fields={fields}
									sections={sections}
								/>
							</FormContent>
						</Row>
					) : (
						<FormContent view={view}>
							<FormLayout
								state={state}
								dispatch={dispatch}
								fields={fields}
								sections={sections}
							/>
						</FormContent>
					)}
				</StyledForm>
			</div>
			{type === "drawer" &&
				<Dialog
					dialogTitle='Are you sure you want to leave OWEN?'
					open={dialogOpen}
					primaryAction={() => handleDialogClose(true)}
					primaryBtnLabel='Yes, leave'
					secondaryAction={() => handleDialogClose(false)}
					secondaryBtnLabel='No, stay'

				>
					You have unsaved changes. If you leave all your changes will be lost.
				</Dialog>
			}
		</>
	);
}

export default memo(Form);
