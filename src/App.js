import React, { useState, useEffect }  from 'react';
import Home from './components/Home'
import Main from './components/Main'
import ScoreBoard from './components/admin/ScoreBoard'
import socketIOClient from "socket.io-client";

import './styles/home.css'

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <Home />
      {/* <Main /> */}
      {/* <ScoreBoard /> */}
    </div>
  );
}

export default App;
