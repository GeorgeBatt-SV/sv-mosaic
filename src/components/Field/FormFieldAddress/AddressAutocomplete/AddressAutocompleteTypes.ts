import { TextFieldProps } from "@mui/material/TextField";

export interface AddressAutocompleteProps {
	value: string;
	onChange: (address: string) => void;
	className?: string;
	onSelect: (value: any) => Promise<void>;
	textField?: TextFieldProps;
	placeholder?: string
	googleMapsApiKey: string;
}

export interface InputSettings {
	value: string;
	onChange: (address: string) => void;
	className?: string;
	onSelect: (value: any) => Promise<void>;
	textField?: TextFieldProps;
	placeholder?: string
}
