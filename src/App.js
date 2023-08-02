import { useState } from 'react'
import GifNotesView from './components/GifNotesView';
import TopAppBar from './components/TopAppBar';
import { ThemeProvider } from '@emotion/react'; 
import theme from './theme';
import './App.css';

function App() {
  const [sharedState, setSharedState] = useState(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar setSharedState={setSharedState} />
        <GifNotesView sharedState={sharedState} setSharedState={setSharedState} />
      </ThemeProvider>
    </>
  );
}

export default App;
