import { createGlobalStyle } from "styled-components"

export const appTheme = {
    colors: {
        background: "#040200",
        foreground: "#27170d",
        primary: "#653815",
        secondary: "#bd6707",
        special: "#f9c043",
        white: "#ffffdd",
    }
}

export const GlobalStyles = createGlobalStyle`
    :root {
        --background-color: ${({ theme }) => theme.colors.background};
        --foreground-color: ${({ theme }) => theme.colors.foreground};
        --primary-color: ${({ theme }) => theme.colors.primary};
        --secondary-color: ${({ theme }) => theme.colors.secondary};
        --special-color: ${({ theme }) => theme.colors.special};
        --white: ${({ theme }) => theme.colors.white}
    }

    html {
        font-size: 16px;
    }

    body {
        background-color: var(--background-color);
        color: var(--white);
    }
`

