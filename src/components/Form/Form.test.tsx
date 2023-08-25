import testArray from "../../utils/testArray";
import * as assert from "assert";
import { generateLayout } from "./formUtils";
import { FieldDef } from "../../components/Field";

describe("Layout logic", () => {
	const fields: FieldDef[] = [
		{
			name: "text1",
			label: "Simple Text",
			type: "text",
		},
		{
			name: "text2",
			label: "Text with validators and dynamic help",
			type: "text",
		},
		{
			name: "text3",
			label: "Text that copies to the next input",
			type: "text"
		},
		{
			name: "text4",
			label: "Text that receives copy",
			type: "text"
		}
	];

	const sections = [
		{
			fields: [
				// row 1
				[["text1"], ["text2"], ["text3"]],
				// row 2
				[["text3"], ["text4"], ["text1"]],
				[[]],
			]
		},
		{
			fields: [
				// row 1
				[[], ["text2"], ["text3"]],
				// row 2
				[[], [], []],
				[[]],
			]
		}
	]

	const tests = [
		{
			name: "Create layout with only fields",
			args: {
				type: "fields",
				data: fields,
				result: [
					{
						fields: [[["text1"]]]
					},
					{
						fields: [[["text2"]]]
					},
					{
						fields: [[["text3"]]]
					},
					{
						fields: [[["text4"]]]
					},
				]
			}
		},
		{
			name: "Ignore empty positions",
			args: {
				type: "sections",
				data: sections,
				result: [
					{
						fields: [
							[["text1"], ["text2"], ["text3"]],
							[["text3"], ["text4"], ["text1"]]
						]
					},
					{
						fields: [
							[["text2"], ["text3"]],
						]
					},
				]
			}
		},
		{
			name: "No sections",
			args: {
				type: "sections",
				data: [
					{
						fields: [
							// row 1
							[[], [], []],
							// row 2
							[[], [], []],
							[[]],
						]
					},
					{
						fields: [
							// row 1
							[[], [], []],
							// row 2
							[[], [], []],
							[[]],
						]
					}
				],
				result: [
					{
						fields: []
					},
					{
						fields: []
					},
				]
			}
		}
	];

	testArray(tests, test => {
		let result: unknown;
		test.type === "fields" ?
			result = generateLayout({ fields })
			:
			result = generateLayout({ fields, sections: test.data })

		assert.deepStrictEqual(result, test.result);
	});
});
