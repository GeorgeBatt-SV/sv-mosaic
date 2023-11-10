import { FieldDefBase } from "@root/components/Field";

export type DateFieldInputSettings = {
	/**
	 * Value to trigger time field
	 */
	showTime?: boolean;
	/**
	 * The minimum date to allow,
	 * defaults to 1st January 1900
	 */
	minDate?: Date
	/**
	 * The maximum date to allow
	 */
	maxDate?: Date
	/**
	 * The placeholder
	 */
	placeholder?: string
	/**
	 * The time to assign to the date if a
	 * time field is not shown. Defaults to
	 * midnight
	 */
	fixedTime?: TimeTuple
};

export type DateData = Date;

export type FieldDefDate = FieldDefBase<"date", DateFieldInputSettings, DateData>

export type TimeTuple = [number, number, number, number];
