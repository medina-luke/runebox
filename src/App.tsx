import { ThemeProvider } from 'styled-components'
import './App.css'
import { appTheme, GlobalStyles } from './theme/theme'
import { useInitializer } from './hooks/useInitializer'
import StoryContainer from './components/StoryContainer'

function App() {
  useInitializer();
  
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <StoryContainer />
    </ThemeProvider>
  )
}

export default App
