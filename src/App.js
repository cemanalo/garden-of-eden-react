import React, { useState }  from 'react';
import Home from './components/Home'
import Main from './components/Main'
import ScoreBoard from './components/admin/ScoreBoard'
import EndResult from './components/EndResult'

import appIo from './io/app'
import pageComponent from './utils/pageComponent'
import './App.css'

function App() {

  const [ connectionStatus, setConnectionStatus ] = useState({ value: '', message: ''})
  const [ activeComponent, setActiveComponent ] = useState(pageComponent.HOME)
  const [ room, setRoom ] = useState()
  const [ io, setIo ] = useState()

  const onSetIo = (io) => {
    setIo(io)
    appIo(io, setConnectionStatus)
  }

  const onConnectionError = () => {
    setConnectionStatus({
      value: 'failed',
      message: 'Failed to connect from server'
    })
  }
  const renderComponent = () => {
    switch(activeComponent) {
      case pageComponent.HOME: 
        return <Home 
          setActiveComponent={setActiveComponent}
          setIo={onSetIo} 
          onConnectionError={onConnectionError}
          setRoom={setRoom}
        />
      case pageComponent.MAIN: return <Main io={io} room={room} setActiveComponent={setActiveComponent} />
      case pageComponent.SCORE_BOARD: return <ScoreBoard io={io} room={room} setActiveComponent={setActiveComponent}/>
      case pageComponent.END_RESULT: return <EndResult setActiveComponent={setActiveComponent} />
      default: return <Home />
    }
  }

  return (
    <div className="App">
      <div className={ `connectionStatus ${connectionStatus.value}`}>
        {connectionStatus.message}
      </div>
      { renderComponent() }
    </div>
  );
}

export default App;
