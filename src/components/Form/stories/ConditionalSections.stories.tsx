import * as React from "react";
import { ReactElement, useEffect, useMemo} from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

// Utils
import { SectionDef, useForm } from "@root/components/Form";
import { renderButtons } from "@root/utils/storyUtils";

// Components
import Form from "../Form";

// Types
import { FieldDef } from "@root/components/Field";

import { ORIGINAL_BODY_MARGIN } from "./utils";

export default {
	title: "Components/Form",
	decorators: [withKnobs],
};

export const ConditionalSections = (): ReactElement => {
	const { state, dispatch } = useForm();
	const KEY_PHRASE = "SHOW";

	useEffect(() => {
		document.body.style.margin = "0px";

		return () => {
			document.body.style.margin = ORIGINAL_BODY_MARGIN;
		}
	}, []);

	const showState = boolean("Show state", false);

	const sections = useMemo<SectionDef[]>(() => {
		return [
			{
				title: "Section 1",
				description: "Description for section 1",
				fields: [
					// row 1
					[["dependency"]],
					// row 2
					[["section_show"]],
				]
			},
			{
				title: "Section 2",
				description: "Description for section 2",
				fields: [
					[["dependent"]],
				],
				show: ({data}) => data?.dependency === KEY_PHRASE && data?.section_show
			},
		]
	}, []);

	const fields = useMemo(
		() : FieldDef[] =>
			[
				{
					name: "dependency",
					label: "Dependency",
					type: "text",
					instructionText: `Type "${KEY_PHRASE}" to show another field`,
					required: true
				},
				{
					name: "section_show",
					label: "Show another section",
					type: "toggleSwitch",
					show: ({ data }) => {
						return data?.dependency === KEY_PHRASE
					},
				},
				{
					name: "dependent",
					label: "Dependent",
					type: "text",
					helperText: state.data.text2,
					required: true
				}
			],
		[]
	);

	return (
		<>
			{
				showState && <pre>{JSON.stringify(state, null, "  ")}</pre>
			}
			<div style={{height: "100vh"}}>
				<Form
					buttons={renderButtons(dispatch)}
					title='Runtime behaviors'
					state={state}
					fields={fields}
					sections={sections}
					dispatch={dispatch}
				/>
			</div>
		</>
	);
};
