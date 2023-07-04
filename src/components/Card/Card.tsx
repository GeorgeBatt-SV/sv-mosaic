import * as React from "react";
import { ReactElement } from "react";
import { CardProps } from "./CardTypes";
import Button from "../Button";
import {
	BottomActionWrapper,
	ContentWrapper,
	CardWrapper,
	StyledHr,
	TitleWrapper,
	TitleBar
} from "./Card.styled";
import ButtonRow from "../ButtonRow/ButtonRow";

const Card = (props: CardProps): ReactElement => {
	const { bottomActions, content, title, titleIcon, topActions } = props;
	const TitleIcon = titleIcon;

	return (
		<CardWrapper>
			<TitleBar>
				<TitleWrapper>
					{titleIcon && <TitleIcon data-testid="contacts-icon-test"/>}
					<p className="card-title">{title}</p>
				</TitleWrapper>
				{topActions?.length > 0 && (
					<ButtonRow buttons={topActions} />
				)}
			</TitleBar>
			<ContentWrapper>
				{content.map((element, idx) => (
					<div key={`card-content-${idx}`}>
						{element}
						{idx !== content.length - 1 && <StyledHr />}
					</div>
				))}
			</ContentWrapper>
			{bottomActions?.length > 0 && (
				<BottomActionWrapper>
					<ButtonRow>
						{bottomActions.map((button, idx) => (
							<Button key={`${button.label}-${idx}`} {...button} />
						))}
					</ButtonRow>
				</BottomActionWrapper>
			)}
		</CardWrapper>
	);
};

export default Card;
