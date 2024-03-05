import * as React from "react";
import { memo, useRef, useCallback, useState, useEffect, useMemo } from "react";

// Components
import Row from "../Row";

// Types
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SectionPropTypes } from "./SectionTypes";
import {
	StyledAccordion,
	StyledDescription,
	StyledRows,
	StyledSectionContent,
	StyledSectionHeader,
	StyledTitle,
} from "./SectionStyled";

const Section = (props: SectionPropTypes) => {
	const {
		title,
		description,
		fieldsDef,
		rows,
		sectionIdx,
		state,
		collapsed = false,
		registerRef,
		gridMinWidth,
		spacing,
		methods,
	} = props;

	const fieldsHaveErrors = useCallback(() => {
		const fieldNames = rows.flat(2);

		if (fieldNames.some(name => state.errors[name])) {
			return true;
		}

		return false;
	}, [rows, state.errors]);

	const defaultExpanded = useMemo(() => {
		if (fieldsHaveErrors()) {
			return true;
		}

		return !collapsed;
	}, [collapsed, fieldsHaveErrors]);

	const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (!fieldsHaveErrors()) {
			return;
		}

		setExpanded(true);
	}, [fieldsHaveErrors]);

	useEffect(() => {
		setExpanded(!collapsed);
	}, [collapsed]);

	const onExpandChange = (_e, newExpandVal) => {
		setExpanded(newExpandVal);
	};

	useEffect(() => {
		const unregister = registerRef(ref.current);
		return unregister;
	}, [ref.current]);

	return (
		<StyledAccordion
			data-testid="section-test-id"
			defaultExpanded={defaultExpanded}
			expanded={expanded}
			onChange={onExpandChange}
			square={true}
			$title={title}
			ref={ref}
		>
			{title && (
				<StyledSectionHeader
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
				>
					<StyledTitle className="section-title">{title}</StyledTitle>
				</StyledSectionHeader>
			)}
			<StyledSectionContent>
				{description && <StyledDescription>{description}</StyledDescription>}
				{rows && (
					<StyledRows $title={title}>
						{rows.map((row, i) => (
							<Row
								key={`row-${i}`}
								row={row}
								rowIdx={i}
								sectionIdx={sectionIdx}
								state={state}
								fieldsDef={fieldsDef}
								gridMinWidth={gridMinWidth}
								spacing={spacing}
								methods={methods}
							/>
						))}
					</StyledRows>
				)}
			</StyledSectionContent>
		</StyledAccordion>
	);
};

Section.displayName = "Section";

export default memo(Section);
