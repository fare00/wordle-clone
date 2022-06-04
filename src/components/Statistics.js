import React from 'react'

function Statistics({style, setModal, info}) {
  return (
    <div className="statistics-content" style={style}>
      <div className="top">
        <span></span>
        <h3>Statistics</h3>
        <span className="material-icons" onClick={() => setModal('game')}>close</span>
      </div>
      <div className="stat-info">
        <div className="info">
          <h1>{info[0]+info[1]}</h1>
          <span>games played</span>
        </div>
        <div className="info">
          <h1>{info[0]}</h1>
          <span>games lost</span>
        </div>
        <div className="info">
          <h1>{info[1]}</h1>
          <span>games won</span>
        </div>
      </div>
    </div>
  )
}

export default Statistics