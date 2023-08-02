import { useState } from 'react'
import GifNotesView from './components/GifNotesView';
import TopAppBar from './components/TopAppBar';
import { ThemeProvider } from '@emotion/react'; 
import theme from './theme';
import './App.css';

function App() {
  const [sharedPopupState, setSharedPopupState] = useState(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar setSharedPopupState={setSharedPopupState} />
        <GifNotesView sharedPopupState={sharedPopupState} setSharedPopupState={setSharedPopupState} />
      </ThemeProvider>
    </>
  );
}

export default App;
