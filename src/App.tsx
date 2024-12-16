import { ThemeProvider } from 'styled-components'
import './App.css'
import Room from './components/Room'
import { appTheme, GlobalStyles } from './theme/theme'
import { useInitializer } from './hooks/useInitializer'

function App() {
  useInitializer();
  
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <Room />
    </ThemeProvider>
  )
}

export default App
