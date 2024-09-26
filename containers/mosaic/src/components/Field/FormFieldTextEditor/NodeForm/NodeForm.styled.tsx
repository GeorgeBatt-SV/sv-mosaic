import styled from "styled-components";

import theme from "@root/theme";
import Button from "@root/components/Button";
import Popper from "@mui/material/Popper";

export const StyledPopper = styled(Popper)`
    z-index: 5;
`;

export const StyledNodeForm = styled.div`
    border: 1px solid ${theme.colors.gray300};
    background: white;
    width: 300px;
`;

export const RemoveButton = styled(Button)`
    && {
        margin-left: auto;

        .adornment-icon {
            width: 24px;
            height: 24px;
        }
    }
`;

export const StyledLinkOpen = styled.a.attrs((props) => ({ ...props, target: "_blank" }))`
    font-family: ${theme.fontFamily};
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: ${theme.colors.teal};
`;
