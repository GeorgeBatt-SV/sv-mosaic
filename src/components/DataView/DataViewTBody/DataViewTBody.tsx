import React, { forwardRef, memo } from "react";
import styled from "styled-components";
import DataViewTr from "../DataViewTr";
import theme from "@root/theme";
import { DataViewTBodyProps } from "./DataViewTBodyTypes";

const StyledTBody = styled.tbody`
	& > tr {
		border-bottom: 1px solid ${theme.newColors.grey2["100"]};

		& > td:first-child {
			padding-left: 16px;
		}

		& > td:last-child {
			padding-right: 16px;
		}
	}

	& > tr > td {
		padding: 8px;
	}

	& > tr > td > div > .transform_thumbnail {
		display: block;
	}
`

const DataViewTBody = forwardRef<HTMLTableSectionElement, DataViewTBodyProps>((props, ref) => (
	<StyledTBody ref={ref}>
		{props.transformedData.map((row, i) => (
			<DataViewTr
				key={row.id as string}
				row={row}
				originalRowData={props.data[i]}
				primaryActions={props.primaryActions}
				additionalActions={props.additionalActions}
				disabled={props.disabled}
				onCheckboxClick={props.onCheckboxClick ? () => props.onCheckboxClick(i) : undefined}
				checked={props.checked ? props.checked[i] : false}
				columns={props.columns}
				onReorder={props.onReorder}
				hasActions={props.hasActions}
			/>
		))}
	</StyledTBody>
));

DataViewTBody.displayName = "DataViewTBody";

export default memo(DataViewTBody);
