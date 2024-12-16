import styled from "styled-components";

export const CommonPre = styled.pre<{ $isInline?: boolean; }>`
    ${props => props.$isInline && `
        display: inline-block;
    `}
`