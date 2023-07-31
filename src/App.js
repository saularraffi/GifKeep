import { useState } from 'react'
import GifNotesView from './components/GifNotesView';
import TopAppBar from './components/TopAppBar';
import { ThemeProvider } from '@emotion/react'; 
import theme from './theme';
import './App.css';

function App() {
  const [sharedState, setSharedState] = useState(null);

  const handleStateChange = (newState) => {
    setSharedState(newState);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopAppBar onStateChange={handleStateChange} />
        <GifNotesView sharedState={sharedState} />
      </ThemeProvider>
    </>
  );
}

export default App;
