import React, { useState } from "react";
import GridFilterText from "../components/GridFilterText.jsx";
import GridFilterMultiselect from "../components/GridFilterMultiselect.jsx";
import JSONDB from "../utils/JSONDB.js";

import categories from "./categories.json";

function Filters() {
	const [values, setValues] = useState({
		no_value : {
			value : ""
		},
		with_value : {
			value : "Testing value"
		},
		with_all_comparisons : {
			value : "",
			comparison : "equals"
		},
		with_some_comparisons : {
			value : "",
			comparison : "equals"
		},
		multiselect_small : {
			value : []
		}
	});
	
	const setState = name => state => {
		setValues({
			...values,
			[name] : state
		});
	}
	
	const optionsApi = new JSONDB(categories);
	
	const mapOptions = val => ({ label : val.tag, value : val.id });
	
	const getOptions = name => async (filter) => {
		if (name === "multiselect_small") {
			const query = {
				limit : filter.limit + 1,
				skip : filter.skip,
				sort : { name : "sort_tag", dir : "asc" }
			}
			
			const results = await optionsApi.find(query);
			
			return {
				docs : results.slice(0, filter.limit).map(mapOptions),
				hasMore : results.length > filter.limit
			};
		}
	}
	
	const getSelected = name => async (ids) => {
		if (name === "multiselect_small") {
			const results = await optionsApi.find({
				filter : { id : { $in : ids } },
				sort : { name : "sort_tag", dir : "asc" }
			});
			
			return results.map(mapOptions);
		}
	}
	
	return (
		<div>
			<h2>Text Filter</h2>
			<GridFilterText
				label="No Value"
				state={values.no_value}
				setState={setState("no_value")}
			/>
			<GridFilterText
				label="With Value"
				state={values.with_value}
				setState={setState("with_value")}
			/>
			<GridFilterText
				label="With All Comparisons"
				state={values.with_all_comparisons}
				comparisons={["equals", "not_equals", "contains", "not_contains", "exists", "not_exists"]}
				setState={setState("with_all_comparisons")}
			/>
			<GridFilterText
				label="With Some Comparisons"
				state={values.with_some_comparisons}
				comparisons={["equals", "not_equals", "contains", "not_contains"]}
				setState={setState("with_some_comparisons")}
			/>
			
			<h2>Multiselect Filters</h2>
			<GridFilterMultiselect
				label="Multiselect"
				getOptions={getOptions("multiselect_small")}
				getSelected={getSelected("multiselect_small")}
				state={values.multiselect_small}
				setState={setState("multiselect_small")}
			/>
		</div>
	);
}

export default Filters;