import styled from "styled-components";

type FlexDirection = "row" | "column";
type FlexWrap = "wrap" | "nowrap";

export const CommonFigureContainer = styled.div<{ direction?: FlexDirection, wrap?: FlexWrap}>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;

    flex-direction: ${props => props.direction || "row"};
    flex-wrap: ${props => props.wrap || "nowrap"}
`;