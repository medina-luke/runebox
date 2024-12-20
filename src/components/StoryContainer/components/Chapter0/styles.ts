import styled, { css, keyframes } from "styled-components";

const unlessAnim = keyframes`
    from {
        font-size: 0;
    }
    to {
        font-size: inherit;
    }
`

const unlessAnim2 = keyframes`
    from {
        transform: translateY(-5%);
    }
    to {
        transform: translateY(5%);
    }
`

export const Unless = styled.span<{ shouldAnimate: boolean; }>`
    ${props => {
        if (props.shouldAnimate) {
            return css`
                animation: ${unlessAnim} 2s ease-in-out 0s, ${unlessAnim2} .1s linear 1.5s infinite alternate;
            `
        }
    }}
    display: inline-block;
    color: var(--special-color);
`

const showAnim = keyframes`
    from {
        opacity: 0;
        visibility: hidden;
    }
    to {
        opacity: 1;
        visibility: visible;
    }
`

export const LightScreen = styled.div<{ shouldFade: boolean; }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: white;
    animation: ${showAnim} .8s ease-in-out;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    
    &::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        transition: 2s ease-in-out;
        background-color: transparent;
        ${props => props.shouldFade && `
            background-color: var(--background-color);
        `}
    }
`

export const AnimatedSpan = styled.span`
    animation: ${showAnim} .8s ease-in-out;
    display: block;
    color: var(--special-color);
`