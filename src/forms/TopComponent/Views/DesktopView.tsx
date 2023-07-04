import * as React from "react";
import { memo, ReactElement, forwardRef } from "react";

// Components
import FormNav from "@root/forms/FormNav";

// Styled components
import styled from "styled-components";
import {
	FlexContainer,
	StyledColumn
} from "../TopComponent.styled";

// Utils
import TitleWrapper from "../Utils/TitleWrapper";
import { BaseTopComponentProps, TopComponentProps } from "../TopComponentTypes";
import { Views } from "@root/theme/theme";
import { TitleRow } from "./Views.styled";
import ButtonRow from "@root/components/ButtonRow/ButtonRow";

const DesktopActionsRow = styled(FlexContainer)`
  align-items: flex-start;

  .MuiFormControlLabel-root {
    margin-right: 20px;
  }
`;

type DesktopViewProps = {
	sections: TopComponentProps["sections"];
	checkbox: JSX.Element;
	sectionsRefs?: any[];
} & BaseTopComponentProps;

const DesktopView = forwardRef((props: DesktopViewProps, ref): ReactElement => {
	const {
		title,
		onBack,
		description,
		tooltipInfo,
		buttons,
		helpIcon,
		showActive,
		sections,
		checkbox,
		view,
		sectionsRefs,
		formContentRef,
	} = props;

	return (
		<StyledColumn className={view} ref={ref} sections={sections && sections.length > 1}>
			<FlexContainer>
				<TitleRow view={view}>
					<TitleWrapper
						title={title}
						onBack={onBack}
						description={description}
					/>
				</TitleRow>
				<DesktopActionsRow>
					{tooltipInfo && helpIcon}
					{showActive && checkbox}
					{buttons && (
						<ButtonRow buttons={buttons} />
					)}
				</DesktopActionsRow>
			</FlexContainer>
			{(view !== Views.bigDesktop && sections) && (
				<FlexContainer>
					<FormNav
						sectionsRefs={sectionsRefs}
						sections={sections}
						formContentRef={formContentRef}
					/>
				</FlexContainer>
			)}
		</StyledColumn>
	);
});

DesktopView.displayName = "DesktopView";

export default memo(DesktopView);
