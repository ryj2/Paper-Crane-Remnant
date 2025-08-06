import React, { useState } from 'react';
import { GameProvider } from './contexts/game-context';
import GameScreen from './components/game-screen';
import TitleScreen from './components/title-screen';
import LoadGameDialog from './components/load-game-dialog';
import './globals.css';

const App: React.FC = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  const handleStartGame = () => {
    setShowTitle(false);
  };

  const handleLoadGame = () => {
    setShowLoadDialog(true);
  };

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
  };

  const handleGameLoaded = () => {
    setShowLoadDialog(false);
    setShowTitle(false);
  };

  return (
    <GameProvider>
      {showTitle ? (
        <>
          <TitleScreen onStart={handleStartGame} onLoadGame={handleLoadGame} />
          {showLoadDialog && (
            <LoadGameDialog 
              open={showLoadDialog} 
              onClose={handleLoadDialogClose}
              onGameLoaded={handleGameLoaded}
            />
          )}
        </>
      ) : (
        <GameScreen />
      )}
    </GameProvider>
  );
};

export default App;
