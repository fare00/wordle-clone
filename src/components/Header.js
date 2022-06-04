import React from 'react'

function Header({setModal, modal, gameState, restart}) {
  return (
    <header>
      <div className={"give-up"+(gameState === 'running' ? '' : ' invisible')} onClick={() => restart(true)}>Give up</div>
      <div className="modal-btns">
        <div onClick={() => setModal(modal === 'settings' ? 'game' : 'settings')} className={modal === 'settings' ? 'active' : ''}><span className="material-icons">settings</span></div>
        <div onClick={() => setModal(modal === 'stats' ? 'game' : 'stats')} className={modal === 'stats' ? 'active' : ''}><span className="material-icons">leaderboard</span></div>
      </div>
    </header>
  )
}

export default Header