import React, { useEffect, useState } from 'react'

function Game({currRow, wordLength, shouldCheck, setShouldCheck, setCurrRow, setState, gameState, answer, setAnswer, setInfo, info, setKeys, keys}) {
  const [cells, setCells] = useState(Array.from({length: 6}).map(() => Array.from({length: wordLength})));
  const [rowIndex, setRowIndex] = useState(0);
  const [dictionary, setDictionary] = useState([]);

  useEffect(() => {
    setCells(cells.map((row, index) => {
        if(index === rowIndex) {
            return row.map((cell, i) => currRow[i]);
        } else return row;
    }));
    let additClass = '';
    const newKeys = {...keys};
    cells.forEach((row, rowKey) => {
        row.forEach((cell, key) => {
            if(cell) {
                additClass = cell && rowKey === rowIndex ? ' pop' : '';
                additClass = answer[key] === cell.toLowerCase() && rowKey !== rowIndex ? ' cell-correct' : additClass;
                additClass = answer[key] !== cell.toLowerCase() && rowKey !== rowIndex && answer.includes(cell.toLowerCase()) ? ' cell-different' : additClass;
                additClass = !answer.includes(cell.toLowerCase()) && rowKey !== rowIndex ? ' cell-wrong' : additClass;
            }
            if(additClass && additClass !== ' pop' && cell) {
                if(newKeys[cell] !== ' key-correct') newKeys[cell] = additClass.replace('cell', 'key');
            }
        });
    });
    setKeys(newKeys);
  }, [currRow]);

  useEffect(() => {
      fetch('./dictionary.json').then(resp => resp.json()).then(data => {
        setDictionary(data);
        const words = data.filter(word => word.length === wordLength);
        setAnswer(words[Math.floor(Math.random()*words.length)]);
      });
  }, []);

  useEffect(() => {
    if(shouldCheck) {
        const answers = cells.map(row => row.join('')).filter(row => row !== '');
        if(dictionary.includes(currRow.join('').toLowerCase()) && !answers.slice(0, answers.length-1).includes(currRow.join(''))) {
            if(answer === currRow.join('').toLowerCase()) {
                setState('win');
                setInfo([info[0], info[1]+1]);
            } else if(answer !== currRow.join('').toLowerCase() && rowIndex+1 >= 6) {
                setState('lost');
                setInfo([info[0]+1, info[1]]);
            } 
            else {
                setState('running');
            }
            setRowIndex(rowIndex+1);
            setCurrRow([]);
        }
    }
    setShouldCheck(false);
  }, [shouldCheck]);

  useEffect(() => {
    if(gameState === '') {
        const words = dictionary.filter(word => word.length === wordLength);
        setAnswer(words[Math.floor(Math.random()*words.length)]);
        setRowIndex(0);
        setCells(Array.from({length: 6}).map(() => Array.from({length: wordLength})));
        setKeys({'Q': '', 'W': '', 'E': '', 'R': '', 'T': '', 'Y': '', 'U': '', 'I': '', 'O': '', 'P': '', 'A': '', 'S': '', 'D': '', 'F': '', 'G': '', 'H': '', 'J': '', 'K': '', 'L': '', 'backspace': '', 'Z': '', 'X': '', 'C': '', 'V': '', 'B': '', 'N': '', 'M': '', 'Enter': ''});
    }
  }, [gameState, wordLength]);

  return (
    <div className="table">
        {cells.map((row, rowKey) => {
            const untilNow = [];
            return (
                <div className="row" key={rowKey}>
                    {row.map((cell, key) => {
                        let additClass = '';
                        if(cell) {
                            additClass = cell && rowKey === rowIndex ? ' pop' : '';
                            additClass = answer[key] === cell.toLowerCase() && rowKey !== rowIndex ? ' cell-correct' : additClass;
                            additClass = answer[key] !== cell.toLowerCase() && rowKey !== rowIndex && answer.includes(cell.toLowerCase()) && (untilNow.filter(un => un === cell).length < answer?.toUpperCase().split('').filter(a => a === cell).length) ? ' cell-different' : additClass;
                            additClass = (!answer.includes(cell.toLowerCase()) || (untilNow.filter(un => un === cell).length >= answer?.toUpperCase().split('').filter(a => a === cell).length)) && answer[key] !== cell.toLowerCase() && rowKey !== rowIndex ? ' cell-wrong' : additClass;
                        }
                        untilNow.push(cell);
                        return (<div className={'cell'+additClass} key={key}>{cell}</div>);
                    })}
                </div>
            )
        })}
    </div>
  )
}

export default Game