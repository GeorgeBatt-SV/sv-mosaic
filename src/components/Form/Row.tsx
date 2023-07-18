import { FieldDef } from "@root/components/Field";
import theme from "@root/theme";
import * as React from "react";
import { memo } from "react";
import styled from "styled-components";

// Components
import Col from "./Col";
import OldCol from "./OldCol";
import { UseFormNewReturn } from "./FormTypes";

const StyledRow = styled.div`
	display: flex;
	margin: 0px -${theme.fieldSpecs.inputSpacing.fieldPadding};
`;

interface RowPropTypes {
	row: string[][];
	state: any;
	fieldsDef: FieldDef[];
	dispatch: any;
	rowIdx?: number;
	sectionIdx?: number;
	methods?: UseFormNewReturn
}

const Row = (props: RowPropTypes) => {
	const { row, rowIdx, state, fieldsDef, dispatch, sectionIdx, methods } = props;

	return (
		<StyledRow>
			{row.map((col, i) => {
				return methods ? (
					<Col
						key={`col-${i}`}
						colIdx={i}
						rowIdx={rowIdx}
						sectionIdx={sectionIdx}
						col={col}
						state={state}
						fieldsDef={fieldsDef}
						dispatch={dispatch}
						colsInRow={row.length}
						methods={methods}
					/>
				) : (
					<OldCol
						key={`col-${i}`}
						colIdx={i}
						rowIdx={rowIdx}
						sectionIdx={sectionIdx}
						col={col}
						state={state}
						fieldsDef={fieldsDef}
						dispatch={dispatch}
						colsInRow={row.length}
					/>
				)
			})}
		</StyledRow>
	);
};

export default memo(Row);
