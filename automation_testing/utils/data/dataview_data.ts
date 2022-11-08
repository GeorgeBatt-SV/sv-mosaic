const dataview_data = {
	allSelectedLabelMsg: "records on this page are selected.",
	resultPerPageDefault: 25,
	resultPerPage50: 50,
	resultPerPage100: 100,
	totalRecords: 304
}

const saveAs_data = {
	defaultView: "Default View",
	saveAsView: "mosaic_automation",
	saveAsViewEdit: "new_mosaic_automation",
	saveAsViewShared: "mosaic_automation_shared",
	saveAsOverwriteView: "mosaic_automation_overwrite",
	defaultType: "default",
	viewNotSharedType: "mine",
	viewSharedType: "shared",
	defaultColumnHeadersList: 4
}

const columns_data = {
	columnsTitle: "Table Settings",
	columnUpdated: "Updated",
	defaultColumnsChecked: [
		"Categories",
		"Created",
		"Image",
		"Title"
	],
	defaultColumnsOrder: [
		"Image",
		"Title",
		"Categories",
		"Created"
	],
	changeItemDown: "Image",
	changeColumnsOrderDown: [
		"Title",
		"Categories",
		"Image",
		"Created"
	],
	changeItemUp: "Categories",
	changeColumnsOrderUp: [
		"Categories",
		"Image",
		"Title",
		"Created"
	],
	addItem: "Content Owner",
	addItemOrder: [
		"Image",
		"Title",
		"Categories",
		"Created",
		"Content Owner"
	],
	addColumnHeadersCount: 5,
	removeItem: "Categories",
	removeItemOrder: [
		"Image",
		"Title",
		"Created"
	],
	removeColumnHeadersCount: 3,
	removeAllItemsCount: 0,
	allItemsChecked: [
		"Categories",
		"Content Owner",
		"Created",
		"Description",
		"ID",
		"Image",
		"Image Deleted",
		"Image Notes",
		"Image Title",
		"Style - bold",
		"Style - ellipsis",
		"Style - italic",
		"Style - noWrap",
		"Style - strikeThrough",
		"Style - Text Transform with large field text to order column",
		"Style - textTransform",
		"Title",
		"Updated"
	],
	allItemsOrder: [
		"Image",
		"Title",
		"Categories",
		"Created",
		"Content Owner",
		"Description",
		"ID",
		"Image Deleted",
		"Image Notes",
		"Image Title",
		"Style - bold",
		"Style - ellipsis",
		"Style - italic",
		"Style - noWrap",
		"Style - strikeThrough",
		"Style - Text Transform with large field text to order column",
		"Style - textTransform",
		"Updated"
	],
	allItemsCount: 18
}

const filter_data = {
	validKeywordFilter: "Accessibility",
	expectedKeywordFilterNumber: 1,
	validKeywordFilterSeveralResults: "Art",
	expectedKeywordFilterNumberSeveralResults: 22,
	keywordNoResultsFilter: "result",
	regExr: "([Aa]rt)",
	upperCaseKeywordFilter: "CITY",
	upperCaseFilterNumber: 13,
	lowerCaseKeywordFilter: "breakfast",
	lowerCaseFilterNumber: 2,
	categoryKeywordFilter: "DMO",
	categoryFilterNumber: 7,
	categoryFilterChooseItem: "Ada",
	categoryFilterChooseItemNumber: 4,
	categoryFilterMoreThanOne: "Beaches",
	categoryFilterMoreThanOneNumber: 11,
	categoryFilterLoadMore: "Cool City",
	categoryFilterLoadMoreNumber: 5,
	categoryFilterMoreMessage: "(1 more)",
	categoryFilterMoreThanTwoNumber: 16
}

const advanced_filter_data = {
	searchedTitleSimple: "Ada",
	searchedTitle: "Ada Village",
	createdFilterResults: 20,
	validStartDateRange: "2019 January 12",
	validEndDateRange: "2021 July 17",
	categoryComparisonHelpDialog: "In - The row must match one of selected option.Not In - The row must match none of the selected options.All - The row must match all of the selected options.Exists - The row must have a value for this filter.Not Exists - The row must not have a value for this filter.",
	errorMessageDates: "End of range cannot be before start of range.",
	updatedOptionFilter: "Updated",
	updateFilterResults: 3,
	noResults: "No results were found."
}

export { dataview_data, saveAs_data, columns_data, filter_data, advanced_filter_data };
