import * as React from "react";
import { ReactElement, useEffect, useMemo, useState, useCallback } from "react";
import { withKnobs, boolean, object, text, select } from "@storybook/addon-knobs";

// Utils
import { checkboxOptions } from "@root/components/Field/FormFieldCheckbox/FormFieldCheckboxUtils"
import { useTable, headers } from "@root/forms/FormFieldTable/tableUtils";
import { useForm, formActions } from "@root/components/Form";
import { useImageVideoLinkDocumentBrowsing, imageVideoSrc } from "@root/components/Field/FormFieldImageVideoLinkDocumentBrowsing/ImageVideoLinkDocumentBrowsingUtils";
import { menuOptions } from "@root/forms/MenuFormFieldCard/MenuFormFieldUtils";
import { renderButtons } from "@root/utils/storyUtils";

// Components
import Form from "../Form";

// Types
import { FieldDef } from "@root/components/Field";
import { additionalOptions } from "@root/components/Field/FormFieldAdvancedSelection";
import { getOptionsCountries, getOptionsStates } from "@root/components/Field/FormFieldAddress/utils/optionGetters";
import { nanoid } from "nanoid";
import { columns, numberTableDefaultValue, rows } from "@root/components/Field/FormFieldNumberTable/numberTableUtils";

import { ORIGINAL_BODY_MARGIN } from "./utils";

export default {
	title: "Components/Form",
	decorators: [withKnobs],
};

const deleteTableRow = () => {
	alert("Delete button clicked");
};

const createNewOption = async (newOptionLabel) => {
	const value = `${newOptionLabel}_${additionalOptions.length}`
	const newOption = {
		label: newOptionLabel,
		value,
	}

	//Insert to db
	additionalOptions.push(newOption);

	return newOption;
}

export const Playground = (): ReactElement => {
	const [loadReady, setLoadReady] = useState(false);
	const { state, dispatch } = useForm();

	useEffect(() => {
		document.body.style.margin = "0px";

		return () => {
			document.body.style.margin = ORIGINAL_BODY_MARGIN;
		}
	}, []);

	const { addTableRow, editAction, extraActionsTable } = useTable(
		state.data,
		"table",
		dispatch
	);
	const { setImage, setVideo, setDocument, setLink, handleRemove } = useImageVideoLinkDocumentBrowsing(dispatch, "imageVideoDocumentLink");

	const showState = boolean("Show state", false);
	const onBack = boolean("onBack", false);
	const prepopulate = boolean("Prepopulate", false);
	const defaultValuesKnob = select("Default Values", ["None", "Has Defaults"], "None");
	const showGetFormValues = select("GetFormValues", ["None", "Returns Undefined", "Returns Data"], "Returns Data");
	const showSave = boolean("Show SAVE button", true);
	const showCancel = boolean("Show CANCEL button", true);
	const required = boolean("Required", true);
	const disabled = boolean("Disabled", false);
	const showSections = select("Show sections", [0, 1, 2, 3], 0);
	const tooltipInfo = text("Tooltip info", "Tooltip info");
	const showTooltipInfo = boolean("Show Tooltip info", false);
	const showActive = boolean("Show active", false);
	const collapsed = boolean("Collapse sections", false);
	const prepopulateValues = object("Prepolulate values", {
		"textField": "Text field from getFormValues",
		"check": [
			{
				label: "Label 1",
				value: "label_1"
			},
			{
				label: "Label 2",
				value: "label_2"
			},
		],
		"chipSelect": {
			"label": "Label 1",
			"value": "label_1"
		},
		"dropdownSingle": {
			"label": "The Dark Knight",
			"value": "2008"
		},
		"phoneSelect": "15205751152",
		"radio": {
			label: "Label 2",
			value: "label_2"
		},
		"toggleSwitch": true,
		"color": "#a8001791",
		"date": new Date(),
		"address": [
			{
				"id": 1,
				"address1": "8950 N. Oracle Road",
				"city": "Tuczon",
				"postalCode": "85704",
				"country": {label: "United States", value: "US"},
				"state": {label: "Arizona", value: "AZ"},
				"types": [
					{label: "Physical", value: "physical"},
				]
			}
		],
		"advancedSelection": [
			{
				label: "getFormValues 1",
				value: "getFormValues option 1"
			},
			{
				label: "getFormValues 2",
				value: "getFormValues option 2"
			},
			{
				label: "getFormValues 3",
				value: "getFormValues option 3"
			},
			{
				label: "getFormValues 4",
				value: "getFormValues option 4"
			}
		],
		"imageVideoDocumentLink": [
			{
				"label": "Type",
				"value": "Image Video Thumbnail"
			}
		],
		"numberTable": numberTableDefaultValue
	});

	const onFileAdd = async ({file, onChunkComplete, onUploadComplete, onError}) => {
		for (let i = 0; i < 10; i++) {
			await new Promise(resolve => setTimeout(() =>
				resolve(
					onChunkComplete({percent: (i + 1) * 0.1})
				), 300)
			);
		}

		await onUploadComplete({
			id: nanoid(),
			name: file.name,
			size: file.size,
			thumbnailUrl: ["image/gif", "image/jpeg", "image/png"].includes(file.type) ? URL.createObjectURL(file) : "",
			fileUrl: URL.createObjectURL(file)
		});
	};

	const onFileDelete = async ({id}) => {
		alert("DELETED FILE: " + id);
	}

	const showDefaultValues: boolean = useMemo(() => defaultValuesKnob === "Has Defaults" && prepopulate, [prepopulate, defaultValuesKnob]);

	const fields = useMemo(
		() : FieldDef[] =>
			[
				{
					name: "textField",
					label: "Simple Text",
					type: "text",
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : "Passing default value",
				},
				{
					name: "check",
					label: "Checkbox",
					type: "checkbox",
					disabled,
					required,
					inputSettings: {
						options: checkboxOptions
					},
					defaultValue: !showDefaultValues ? undefined : [
						{
							label: "Label 1",
							value: "label_1"
						},
						{
							label: "Label 2",
							value: "label_2"
						},
						{
							label: "Label 3",
							value: "label_3"
						}
					],
				},
				{
					name: "chipSelect",
					label: "Chip single select",
					type: "chip",
					inputSettings: {
						options: [
							{
								label: "Label 1",
								value: "label_1"
							},
							{
								label: "Label 2",
								value: "label_2"
							},
							{
								label:
									"Very long label that should fit: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
								value: "label_3"
							}
						],
					},
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : {
						"label": "Very long label that should fit: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
						"value": "label_3"
					}
				},
				{
					name: "dropdownSingle",
					label: "Dropdown single select",
					type: "dropdown",
					disabled,
					required,
					inputSettings: {
						options: [
							{ label: "The Shawshank Redemption", value: "1994" },
							{ label: "The Godfather", value: "1972" },
							{ label: "The Godfather: Part II", value: "1974" },
							{ label: "The Dark Knight", value: "2008" },
							{ label: "12 Angry Men", value: "1957" },
							{ label: "Schindler's List", value: "1993" },
							{ label: "Pulp Fiction", value: "1994" },
							{ label: "The Lord of the Rings: The Return of the King", value: "2003" },
							{ label: "The Good, the Bad and the Ugly", value: "1966" },
							{ label: "Fight Club", value: "1999" },
							{ label: "The Lord of the Rings: The Fellowship of the Ring", value: "2001" },
							{ label: "Star Wars: Episode V - The Empire Strikes Back", value: "1980" },
							{ label: "Forrest Gump", value: "1994" },
							{ label: "Inception", value: "2010" },
							{ label: "The Lord of the Rings: The Two Towers", value: "2002" },
							{ label: "One Flew Over the Cuckoo's Nest", value: "1975" },
							{ label: "Goodfellas", value: "1990" },
							{ label: "The Matrix", value: "1999" },
							{ label: "Seven Samurai", value: "1954" },
							{ label: "Star Wars: Episode IV - A New Hope", value: "1977" },
							{ label: "City of God", value: "2002" },
							{ label: "Se7en", value: "1995" },
						],
					},
					defaultValue: !showDefaultValues ? undefined : {
						label: "The Shawshank Redemption",
						value: "1994"
					}
				},
				{
					name: "phoneSelect",
					label: "Phone selection",
					type: "phone",
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : "15205751151"
				},
				{
					name: "radio",
					label: "Radio selection",
					type: "radio",
					disabled,
					required,
					inputSettings: {
						options: [
							{
								label: "Label 1",
								value: "label_1"
							},
							{
								label: "Label 2",
								value: "label_2"
							},
							{
								label: "Label 3",
								value: "label_3"
							}
						],
					},
					defaultValue: !showDefaultValues ? undefined : {
						label: "Label 3",
						value: "label_3"
					}
				},
				{
					name: "toggleSwitch",
					label: "Toggle field",
					disabled,
					required,
					type: "toggleSwitch",
					inputSettings: {
						toggleLabel: "To the side"
					},
					defaultValue: !showDefaultValues ? undefined : true
				},
				{
					name: "color",
					label: "Color selector example",
					disabled,
					required,
					type: "color",
					defaultValue: !showDefaultValues ? undefined : "#19a80091"
				},
				{
					name: "date",
					label: "Single Date Picker",
					type: "date",
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : new Date()
				},
				{
					name: "address",
					label: "Address field",
					type: "address",
					inputSettings: {
						getOptionsCountries,
						getOptionsStates,
						googleMapsApiKey: "AIzaSyArV4f-KFF86Zn9VWAu9wS4hHlG1TXxqac"
					},
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : [
						{
							"id": 1,
							"address1": "8950 N. Oracle Road",
							"city": "Tuczon",
							"postalCode": "85704",
							"country": {label: "United States", value: "US"},
							"state": {label: "Arizona", value: "AZ"},
							"types": [
								{label: "Physical", value: "physical"},
								{label: "Billing", value: "billing"},
								{label: "Shipping", value: "shipping"}
							]
						}
					]
				},
				{
					name: "advancedSelection",
					label: "Advanced Selection field",
					type: "advancedSelection",
					disabled,
					required,
					inputSettings: {
						options: additionalOptions,
						createNewOption,
					},
					defaultValue: !showDefaultValues ? undefined : [
						{
							label: "Default Value 1",
							value: "def option 1"
						},
						{
							label: "Default Value 2",
							value: "def option 2"
						},
						{
							label: "Option 1",
							value: "option_1-cat_1",
						},
						{
							label: "Option 2",
							value: "option_2-cat_1",
						},
						{
							label: "Option 3",
							value: "option_3-cat_1",
						},
						{
							label: "Option 4",
							value: "option_4-cat_1",
						},
						{
							label: "Option 1 category 2",
							value: "option_1-cat_2",
						},
						{
							label: "Test option category 2",
							value: "option_2-cat_2",
						},
						{
							label: "Another option of catergory 2",
							value: "option_3-cat_2",
						},
					]
				},
				{
					name: "imageVideoDocumentLink",
					label: "Image Video and Document field",
					type: "imageVideoDocumentLink",
					disabled,
					required,
					inputSettings: {
						options: menuOptions,
						handleSetImage: setImage,
						handleSetDocument: setDocument,
						handleSetVideo: setVideo,
						handleSetLink: setLink,
						handleRemove,
						src: imageVideoSrc,
					},
					defaultValue: !showDefaultValues ? undefined : [
						{
							"label": "Title",
							"value": "Video Thumbnail - YouTube - Visit Santa Fe, New Mexico Video Thumbnail"
						},
						{
							"label": "Type",
							"value": "Image Video Thumbnail"
						},
						{
							"label": "Alt",
							"value": "-"
						},
						{
							"label": "Size",
							"value": "1280x720"
						},
						{
							"label": "Focus",
							"value": "No"
						},
						{
							"label": "Locales",
							"value": "-"
						}
					]
				},
				{
					name: "textEditor",
					label: "Text Editor field",
					type: "textEditor",
					disabled,
					required,
					defaultValue: !showDefaultValues ? undefined : "Passing default value"
				},
				{
					name: "table",
					label: "Table example",
					type: "table",
					disabled,
					required,
					inputSettings: {
						handleAddElement: addTableRow,
						handleEdit: editAction,
						handleDelete: deleteTableRow,
						extraActions: extraActionsTable,
						headers,
					},
					defaultValue: !showDefaultValues ? undefined : [
						{
							"id": "1",
							"items": [
								"John",
								"john@email.com",
								"01/01/2021",
								"3231-962-7516"
							]
						},
						{
							"id": "1",
							"items": [
								"Mark",
								"mark@email.com",
								"01/01/2022",
								"3231-962-7518"
							]
						}
					]
				},
				{
					name: "address",
					type: "address",
					label: "Address",
				},
				{
					name: "imageUpload",
					label: "Image Upload example",
					type: "imageUpload",
					disabled,
					required,
					inputSettings: {
						options: menuOptions
					},
					defaultValue: !showDefaultValues ? undefined : {
						"imgName": "image (2).png",
						"size": 61571,
						"type": "image/png",
						"height": 600,
						"width": 777
					}
				},
				{
					name: "mapCoordinates",
					label: "Map Coordinates example",
					type: "mapCoordinates",
					disabled,
					required,
					inputSettings: {
						googleMapsApiKey: "AIzaSyArV4f-KFF86Zn9VWAu9wS4hHlG1TXxqac"
					},
					defaultValue: !showDefaultValues ? undefined : {
						"lat": 32.3395031,
						"lng": -110.9864294
					}
				},
				{
					name: "upload",
					label: "Upload example",
					type: "upload",
					disabled,
					required,
					inputSettings: {
						onFileAdd,
						onFileDelete,
						limit: undefined,
					},
					defaultValue: !showDefaultValues ? undefined : [
						{
							"id": "1",
							"name": "roomBlocks.xslx",
							"size": 386359,
						},
						{
							"id": "2",
							"name": "floorplan.jpg",
							"size": 282010,
						},
						{
							"id": "3",
							"name": "SV.png",
							"size": 151418,
							"thumbnailUrl": "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_520,q_75,w_780/v1/clients/simpleview/15_bbd7902e-9b13-473b-a94e-a1347fdab277.jpg",
							"downloadUrl": "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_520,q_75,w_780/v1/clients/simpleview/15_bbd7902e-9b13-473b-a94e-a1347fdab277.jpg"
						},
						{
							"id": "4",
							"name": "MyHotel-AZ.png",
							"size": 1447671
						},
						{
							"id": "5",
							"name": "opportunity.pdf",
							"size": 20842780
						},
						{
							"id": "6",
							"name": "summit.png",
							"size": 840038,
							"thumbnailUrl": "https://ttra.com/wp-content/uploads/2022/02/Simpleview-Summit.jpg",
							"downloadUrl": "https://ttra.com/wp-content/uploads/2022/02/Simpleview-Summit.jpg"
						},
					],
				},
				{
					name: "numberTable",
					label: "Number Table",
					type: "numberTable",
					required,
					disabled,
					defaultValue: !showDefaultValues ? undefined : numberTableDefaultValue,
					inputSettings: {
						rowTotalLabel: "TOTAL",
						columnTotalLabel: "No. Rooms",
						topLeftLabel: "Day",
						rows: rows,
						columns: columns
					},
				},
			],
		[additionalOptions, disabled, required, showDefaultValues]
	);

	const sections = useMemo(() => {
		return [
			{
				title: text("Title section 1", "Section 1"),
				description: text("Description for section 1", "Description for section 1"),
				collapsed,
				fields: [
					// row 1
					[["textField"], ["check"]],
					// row 2
					[["chipSelect"], ["dropdownSingle"]],
					[["address"], ["table"]],
					// row 3
					[["phoneSelect"], ["radio"]]
				]
			},
			{
				title: text("Title section 2", "Section 2"),
				description: text("Description for section 2", "Description for section 2"),
				collapsed,
				fields: [
					// row 1
					[[], [], []],
					// row 2
					[["toggleSwitch"], [], ["mapCoordinates"]],
					[[]],
					// row 3
					[[], ["advancedSelection"]]
				]
			},
			{
				title: text("Title section 3", "Section 3"),
				description: text("Description for section 3", "Description for section 3"),
				collapsed,
				fields: [
					// row 1
					[["color"], ["date"],],
					// row 2
					[["textEditor"], []]
				]
			}
		];
	}, [collapsed]);

	const sectionsAmount = useMemo(() => sections.slice(0, showSections), [sections, showSections]);

	/**
	 * Function that prepopulates the form. Includes
	 * an artificial delay just to show how the form
	 * is disabled while fields values are being resolved.
	 */
	const getFormValues = useCallback(async () => {
		await new Promise((res) => setTimeout(res, 1000));

		if (showGetFormValues === "Returns Undefined") {
			return undefined;
		} else {
			return {
				...prepopulateValues
			};
		}
	}, [prepopulateValues, showGetFormValues, showDefaultValues]);

	useEffect(() => {
		const resetForm = async () => {
			await dispatch(formActions.resetForm());
			setLoadReady(true);
		};
		prepopulate ? resetForm() : setLoadReady(false);
	}, [prepopulate, showGetFormValues, showDefaultValues]);

	return (
		<>
			{
				showState && <pre>{JSON.stringify(state, null, "  ")}</pre>
			}
			<Form
				title={text("Title", "Form Title")}
				onBack={onBack ? () => alert("Cancelling, going back to previous site") : undefined}
				description={text("Description", "This is a description example")}
				state={state}
				fields={fields}
				dispatch={dispatch}
				getFormValues={showGetFormValues === "None" ? undefined : (loadReady && getFormValues)}
				sections={showSections > 0 ? sectionsAmount : undefined}
				buttons={renderButtons(dispatch, { showCancel, showSave })}
				tooltipInfo={showTooltipInfo && tooltipInfo}
				showActive={showActive}
			/>
		</>
	);
};
