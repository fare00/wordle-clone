import { useEffect, useState } from "react";
import End from "./components/End";
import Game from "./components/Game";
import Header from "./components/Header";
import Keyboard from './components/Keyboard';
import Logo from "./components/Logo";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";

function App() {
  const [currRow, setCurrRow] = useState([]);
  const [shouldCheck, setShouldCheck] = useState(false);
  const [wordLength, setWordLength] = useState(5);
  const [modal, setModal] = useState('game');
  const [gameState, setState] = useState('');
  const [answer, setAnswer] = useState('');
  const [info, setInfo] = useState([0, 0]);
  const [keys, setKeys] = useState({'Q': '', 'W': '', 'E': '', 'R': '', 'T': '', 'Y': '', 'U': '', 'I': '', 'O': '', 'P': '', 'A': '', 'S': '', 'D': '', 'F': '', 'G': '', 'H': '', 'J': '', 'K': '', 'L': '', 'backspace': '', 'Z': '', 'X': '', 'C': '', 'V': '', 'B': '', 'N': '', 'M': '', 'Enter': ''});

  const handleKeyPress = (key) => {
    if(!['win', 'lost'].includes(gameState)) {
      const pressedKey = (key.key ?? key).toUpperCase();

      if(pressedKey === 'BACKSPACE') setCurrRow([...currRow].slice(0, currRow.length-1));
      else if(pressedKey === 'ENTER' && currRow.length === wordLength) setShouldCheck(true);
      else if(currRow.length < wordLength && (key.code ? key.code.includes('Key') : key)) setCurrRow([...currRow, pressedKey]);
    }
  }

  useEffect(() => {
    const storageInfo = window.localStorage.getItem('info');
    if(storageInfo) {
      setInfo(JSON.parse(storageInfo));
    } else window.localStorage.setItem('info', '[0, 0]');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('info', JSON.stringify(info));
  }, [info]);

  const restart = (isGiveUp) => {
    if(isGiveUp === true) setInfo([info[0]+1, info[1]]);
    setCurrRow([]);
    setState('');
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => { window.removeEventListener('keydown', handleKeyPress); }
  }, [currRow]);

  const handleTabClosing = () => { if(gameState === 'running') window.localStorage.setItem('info', JSON.stringify([info[0]+1, info[1]])); }

  useEffect(() => {
    window.addEventListener('beforeunload', handleTabClosing);

    return () => { window.removeEventListener('beforeunload', handleTabClosing); }
  }, [gameState]);

  useEffect(() => {
    restart();
  }, [wordLength]);

  return (
    <div className="container">
      <Logo />
      <Header setModal={setModal} modal={modal} gameState={gameState} restart={restart} />
      <div className="game-content" style={modal === 'game' ? {display: 'block'} : {}}>
        <Game keys={keys} setKeys={setKeys} info={info} setInfo={setInfo} answer={answer} setAnswer={setAnswer} currRow={currRow} wordLength={wordLength} shouldCheck={shouldCheck} setShouldCheck={setShouldCheck} setCurrRow={setCurrRow} setState={setState} gameState={gameState} />
        <div className="alert-message">
          <h4 style={{color: gameState === 'win' ? '#7bd27b' : '#cc0000'}}>{gameState === 'win' ? 'You Won!' : (gameState === 'lost' ? 'You Lost!' : '')}</h4>
        </div>
        <Keyboard handleKeyPress={handleKeyPress} keys={keys} />
      </div>
      <Settings style={modal === 'settings' ? {display: 'block'} : {}} setModal={setModal} wordLength={wordLength} setWordLength={setWordLength} />
      <Statistics style={modal === 'stats' ? {display: 'block'} : {}} setModal={setModal} info={info} />
      <End restart={restart} answer={answer} gameState={gameState}/>
    </div>
  );
}

export default App;
