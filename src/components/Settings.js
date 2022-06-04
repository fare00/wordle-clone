import React from 'react'

function Settings({style, setModal, setWordLength, wordLength}) {
  const letterNums = [4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="settings-content" style={style}>
        <div className="top">
          <span></span>
          <h3>Settings</h3>
          <span className="material-icons" onClick={() => setModal('game')}>close</span>
        </div>
        <div className="letters-num">
          <h4>Number of Letters</h4>
          <div className="nums">
            {letterNums.map((num, key) => (<div className={"num"+(wordLength === num ? ' active' : '')} key={key} onClick={() => setWordLength(num)}>{num}</div>))}
          </div>
        </div>
    </div>
  )
}

export default Settings