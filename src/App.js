import Test from './components/test';
import GifNotesView from './components/GifNotesView';
import TopAppBar from './components/TopAppBar';
import { ThemeProvider } from '@emotion/react'; 
import theme from './theme';
import './App.css';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Test /> */}
        <TopAppBar />
        <GifNotesView />
      </ThemeProvider>
    </>
  );
}

export default App;
