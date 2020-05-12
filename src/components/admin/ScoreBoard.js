import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import ChartComponent from './ChartComponent'
import RoundResult from './RoundResult'

import '../../styles/admin/score_board.css'
import useStickyState from '../../utils/useStickyState';
import roomService from '../../services/room'
import gameStatus from '../../utils/gameStatus'
import pageComponent from '../../utils/pageComponent'

export default function ScoreBoard (props) {
  const [ roomId ] = useStickyState("", "roomId")
  const [ activeComponent, setActiveComponent ] = useState('CHART')
  useEffect(() => {
    roomService.getRoomById(roomId).then(room => {
      if(room.gameStatus === gameStatus.IN_PROGRESS) {
        setActiveComponent('ROUND')
      }
    })
  })

  const onEndGame = () => {
    props.setActiveComponent(pageComponent.END_RESULT)
  }

  return <Container maxWidth={"md"}>
    <div className="topData">
      <div className="room">
        <span>Room: {roomId}</span>
      </div>
      <div className="roundText">
        <span>G<AppleIcon style={{ color: "red" }}/>rden of Eden</span>
      </div>
      { activeComponent === 'CHART' && <ChartComponent io={props.io} setActiveComponent={setActiveComponent} onEndGame={onEndGame} /> }
      { activeComponent === 'ROUND' && <RoundResult io={props.io} setActiveComponent={setActiveComponent} /> }
    </div>
  </Container>
}
