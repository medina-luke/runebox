import { ThemeProvider } from 'styled-components'
import './App.css'
import Room from './components/Room'
import { appTheme, GlobalStyles } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <Room />
    </ThemeProvider>
  )
}

export default App
