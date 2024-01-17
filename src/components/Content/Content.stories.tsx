import * as React from "react";
import { ReactElement, useState } from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { Meta } from "@storybook/addon-docs/blocks";

// Components
import Content, { ContentField } from ".";
import {
	transform_chips,
	transform_colorPicker,
	transform_dateFormat,
	transform_thumbnail,
	transform_boolean,
	transform_dataview,
} from "@root/transforms/column_transforms";
import { ChipsWrapper } from "./Content.styled";
import Chip from "../Chip";
import EditIcon from "@mui/icons-material/Edit";
import { ButtonProps } from "@root/components/Button";
import { Link } from "@mui/material";

export default {
	title: "Components/Content",
	decorators: [withKnobs],
} as Meta;

const chips = [
	{
		label: "Chip as value 1",
		value: "chip_value1",
	},
	{
		label: "Chip as value 2",
		value: "chip_value2",
	},
	{
		label: "Chip as value 3",
		value: "chip_value3",
	},
];

const data = {
	tags: [
		{
			label: "Chip 1",
			value: "chip-1",
		},
		{
			label: "Chip 2",
			value: "chip-2",
		},
		{
			label: "Chip 3",
			value: "chip-3",
		},
		{
			label: "Chip 4",
			value: "chip-4",
		},
	],
	date: new Date("December 17, 1995 03:24:00"),
	toggle: false,
	colorPicker: "#a8001791",
	thumbnail:
		"https://res.cloudinary.com/simpleview/image/upload/v1542821844/clients/grandrapids/_OD_0354_c78fbb66-c75a-4804-9430-9af38ed8e9d5.jpg",
	chipsAsValue: (
		<ChipsWrapper>
			{chips?.map((chip) => (
				<Chip key={`${chip?.label}-${chip?.value}`} label={chip?.label} />
			))}
		</ChipsWrapper>
	),
	undefinedValue: undefined,
	emptyStringValue: "",
	emptyArrayValue: [],
	animals: [{id: 1, species: "Dog", color: "Brown"}, {id: 2, species: "Cat", color: "White"}],
	cars: [{id: 1, make: "BMW", model: "M3"}, {id: 2, make: "Volkswagen", model: "Golf"}],
};

const sectionConfigs = {
	"Single Column": [
		[["tags"]],
		[["colorPicker"]],
		[["toggle"]],
		[["date"]],
		[["thumbnail"]],
		[["chipsAsValue"]],
		[["animals"]],
		[["cars"]]
	],
	"Multiple Columns": [
		[["tags"], ["colorPicker"]],
		[["toggle"], ["date"]],
		[["thumbnail"], ["chipsAsValue"]],
		[["animals"], ["cars"]]
	],
};

export const Playground = (): ReactElement => {
	const title = text("Title", "Main Content Title");
	const variant = select("Variant", ["standard", "card"], "standard");
	const sectionConfigKey = select("Sections", ["Single Column", "Multiple Columns"], "Single Column");
	const showButtons = select("Buttons", ["1", "2", "0", "undefined"], "2");
	const useSections = boolean("Use sections", true);
	const amountContent = select(
		"Amount of contents",
		[1, 2],
		1
	);
	const [showMore, setShowMore] = useState(false);

	/**
	 * Toggles the state use to show or hide the content.
	 */
	const showDetails = () => {
		setShowMore(!showMore);
	};

	const buttons: ButtonProps[] = [
		{
			name: "edit",
			label: "Edit",
			mIcon: EditIcon,
			color: "gray",
			variant: "icon",
			show: [showButtons !== "undefined", Number(showButtons) >= 1],
			onClick: function () {
				alert("Edit button clicked");
			}
		},
		{
			name: "showDetails",
			color: "teal",
			variant: "text",
			label: showMore ? "Less Details" : "More Details",
			onClick: showDetails,
			show: [useSections, showButtons !== "undefined", Number(showButtons) >= 2],
		},
	]

	const fields: ContentField[] = [
		{
			name: "chips",
			label: "Chips using transform_chips()",
			transforms: [transform_chips()],
			column: "tags",
		},
		{
			name: "toggle",
			label: "Toggle using transform_boolean()",
			transforms: [transform_boolean()],
		},
		{
			name: "date",
			label: "Date using transform_dateFormat()",
			transforms: [transform_dateFormat()],
		},
		{
			name: "color",
			label: "Color using transform_colorPicker()",
			transforms: [transform_colorPicker()],
			column: "colorPicker",
		},
		{
			name: "thumbnail",
			label: "Thumbnail using transform_thumbnail()",
			transforms: [transform_thumbnail({ width: 150, height: 150 })],
		},
		{
			name: "chipsAsValue",
			label: "Chips with no transform only value"
		},
		{
			name: "animals",
			label: "Animals",
			transforms: [transform_dataview({ columns: [{ name: "species", label: "Species" }, { name: "color", label: "Color" }] })]
		},
		{
			name: "cars",
			label: "Cars",
			transforms: [transform_dataview({ columns: [{ name: "make", label: "Make" }, { name: "model", label: "Model" }] })]
		},
	];

	const sections = sectionConfigs[sectionConfigKey];

	return (
		<>
			<Content
				title={title}
				data={data}
				fields={fields}
				sections={sections.slice(0, showMore ? undefined : 2)}
				buttons={buttons}
				variant={variant}
			/>
			{amountContent === 2 &&
				<Content
					title={"Second content"}
					data={data}
					fields={fields}
					sections={sections}
					variant={variant}
				/>
			}
		</>
	);
};

export const KitchenSink = (): ReactElement => {

	const buttons: ButtonProps[] = [
		{
			name: "edit",
			label: "Edit",
			mIcon: EditIcon,
			color: "gray",
			variant: "icon",
			onClick: function () {
				alert("Edit button clicked");
			}
		},
		{
			name: "showDetails",
			color: "teal",
			variant: "text",
			label: "More Details",
			onClick: () => alert("More details") ,
		},
	]

	const fields: ContentField[] = [
		{
			name: "chips",
			label: "Chips using transform_chips()",
			transforms: [transform_chips()],
			column: "tags",
		},
		{
			name: "toggle",
			label: <Link href="#">Toggle using transform_boolean()</Link>,
			transforms: [transform_boolean()],
		},
		{
			name: "date",
			label: "Date using transform_dateFormat()",
			transforms: [transform_dateFormat()],
		},
		{
			name: "color",
			label: "Color using transform_colorPicker()",
			transforms: [transform_colorPicker()],
			column: "colorPicker",
		},
		{
			name: "thumbnail",
			label: "Thumbnail using transform_thumbnail()",
			transforms: [transform_thumbnail({ width: 150, height: 150 })],
		},
		{
			name: "chipsAsValue",
			label: "Chips with no transform only value"
		},
		{
			name: "undefinedValue",
			label: "Field with undefined value"
		},
		{
			name: "emptyStringValue",
			label: "Field with empty string value"
		},
		{
			name: "emptyArrayValue",
			label: "Field with empty array value"
		},
	];

	const columns = [
		[["tags"], ["colorPicker"], []],
		[["toggle"], ["date"], ["colorPicker"],],
		[["thumbnail"], ["chipsAsValue"], ["thumbnail"]],
		[["undefinedValue"], ["emptyStringValue"], ["emptyArrayValue"]]
	];

	return (
		<>
			<Content
				title={"Standard content"}
				data={data}
				fields={fields}
				sections={columns}
				buttons={buttons}
			/>
			<br/>
			<Content
				title={"Card content"}
				data={data}
				fields={fields}
				sections={columns}
				buttons={buttons}
				variant={"card"}
			/>
		</>
	);
};
