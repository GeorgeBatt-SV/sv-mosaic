import * as React from "react";
import { ReactElement } from "react";

import { TypographyProps, TypographyTag, TypographyVariant } from "./TypographyTypes";
import { styledCache } from "./Typography.styled";

const { getComponent } = styledCache();

const defaultTagMap: Record<TypographyVariant, TypographyTag> = {
	title: "h1",
	subtitle: "h3",
	body: "div"
}

export default function Typography({
	children,
	attrs = {},
	as,
	tag: providedTag = as,
	variant,
	maxLines,
	color,
	breakAll,
	className
}: TypographyProps): ReactElement {
	const tag = providedTag || defaultTagMap[variant];
	const Component = getComponent(tag);

	return (
		<div className={className}>
			<Component
				{...attrs}
				$variant={variant}
				$maxLines={maxLines}
				$color={color}
				$breakAll={breakAll}
				title={typeof children === "string" ? children : undefined}
			>
				{children}
			</Component>
		</div>
	);
}
