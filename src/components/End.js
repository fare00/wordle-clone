import React from 'react'

function End({restart, gameState, answer}) {
  return (
    <div className="end-content" style={['win', 'lost'].includes(gameState) ? {display: 'flex'} : {}}>
        <div className="end">
            <h3>{gameState === 'win' ? 'You Won!' : 'You Lost!'}</h3>
            {gameState === 'lost' ?
                <>
                <p>The answer was:</p>
                <div className="answer">{answer}</div>
                </>
            : ''}
            <div className="restart" onClick={restart}>restart</div>
        </div>
    </div>
  )
}

export default End