import React from 'react'

function Keyboard({ handleKeyPress, keys }) {
  return (
    <div className="keyboard">
      <div className="row">
        {Object.entries(keys).slice(0, 10).map(key => (<div className={"key "+key[1]} key={key[0]} onClick={() => handleKeyPress(key[0])}>{key[0]}</div>))}
      </div>
      <div className="row">
        {Object.entries(keys).slice(10, 19).map(key => (<div className={"key "+key[1]} key={key[0]} onClick={() => handleKeyPress(key[0])}>{key[0]}</div>))}
      </div>
      <div className="row">
        {Object.entries(keys).slice(19).map(key => (<div className={"key "+key[1]} key={key[0]} onClick={() => handleKeyPress(key[0])}>{key[0]}</div>))}
      </div>
    </div>
  )
}

export default Keyboard