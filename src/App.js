import { useState } from 'react'
import GifNotesView from './components/GifNotesView';
import TopAppBar from './components/TopAppBar';
import SideDrawer from './components/SideDrawer';
import { ThemeProvider } from '@emotion/react'; 
import theme from './theme';
import './App.css';

function App() {
  const [sharedPopupState, setSharedPopupState] = useState(null);
  const [sharedDrawerState, setSharedDrawerState] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar setSharedPopupState={setSharedPopupState} openDrawer={setSharedDrawerState} />
        <SideDrawer open={sharedDrawerState} setOpen={setSharedDrawerState} />
        <GifNotesView sharedPopupState={sharedPopupState} setSharedPopupState={setSharedPopupState} />
      </ThemeProvider>
    </>
  );
}

export default App;
