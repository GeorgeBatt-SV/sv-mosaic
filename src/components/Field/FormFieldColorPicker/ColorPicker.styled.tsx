import styled from "styled-components";
import theme from "@root/theme";
import { ColorSelectedProps } from "./ColorPickerTypes";
import { StyledProps } from "@root/types";
import { Popover } from "@mui/material"

export const ColorContainer = styled.div<StyledProps<ColorSelectedProps, "displayColorPicker" | "disabled">>`
  background: ${theme.newColors.grey1["100"]};
  border: ${theme.borders.simplyGrey};
  margin-bottom: ${({ $displayColorPicker }) => ($displayColorPicker ? "8px" : 0)};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  padding: 10px;
  width: fit-content;
`;

export const ColorDiv = styled.div<StyledProps<ColorSelectedProps, "disabled" | "color">>`
  ${({ $color }) => {
		if (
			$color.r !== undefined &&
      $color.b !== undefined &&
      $color.b !== undefined &&
      $color.a !== undefined
		) {
			return `background: rgba(${$color.r}, ${$color.g}, ${$color.b}, ${$color.a});`;
		} else {
			return `background: ${$color};`;
		}
	}}
  cursor: ${({ $disabled }) => (!$disabled ? "pointer" : "auto")};
  height: 31px;
  pointer-events: ${({ $disabled }) => (!$disabled ? "auto" : "none")};
  width: 80px;
`;

export const PopOver = styled(Popover)`
`;
