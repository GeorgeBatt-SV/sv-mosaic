import { ButtonProps } from "@root/components/Button";
import { FieldDef } from "@root/components/Field";
import { Section } from "@root/forms/FormNav/FormNavTypes";
import { MosaicObject, MosaicShow } from "@root/types";
import { Control, UseFormReturn } from "react-hook-form/dist/types";

export interface SectionDef extends Section {
	title?: string;
	description?: string | JSX.Element;
	fields: string[][][];
	collapsed?: boolean;
	show?: MosaicShow
}

export type UseFormNewReturn = UseFormReturn & {
	pairedValidation: (fieldNames: string[]) => void
}

export interface FormProps {
	state: any;
	title?: string;
	onBack?: (() => void) | ((...args: any) => void);
	fields: FieldDef[];
	sections?: SectionDef[];
	dispatch: any;
	dialogOpen?: boolean;
	description?: string;
	getFormValues?(): Promise<MosaicObject>;
	handleDialogClose?: (val: boolean) => void;
	buttons?: ButtonProps[];
	tooltipInfo?: string;
	showActive?: boolean;
	control?: Control
	methods?: UseFormNewReturn
}

export { FieldDef };
