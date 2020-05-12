import React, { useState, useEffect } from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Button } from '@material-ui/core';

import useStickyState from '../../utils/useStickyState'
import userService from '../../services/user'
import roomService from '../../services/room'
import gameStatus from '../../utils/gameStatus'
import adminIo from '../../io/adminIo'

export default function ChartComponent (props) {
  const [ users, setUsers ] = useState([])
  const [ roomId ] = useStickyState("", "roomId")
  useEffect(() => {
    userService.getUsersByRoomId(roomId).then(users => setUsers(users))
    props.io.on('userJoined', () => {
      console.log('userJoined')
      userService.getUsersByRoomId(roomId).then(users => setUsers(users))
    })
  }, [ roomId, props.io ])

    const [ room, setRoom ] = useState({})
    useEffect(() => {
      roomService.getRoomById(roomId).then(room => setRoom(room))
    }, [ roomId ])


  const onStartGame = () => {
    adminIo.startGame(props.io, roomId)
  }

  const onNextRound = async () => {
    console.log("next round")
    props.io.on(`${roomId}::nextRound`, () => {
      console.log('nextRound')
      props.setActiveComponent('ROUND')
    })
    const room = await roomService.nextRound(roomId)
    console.log('onNextRound', room)
    props.io.emit('nextRound', roomId)
  }

  const onEndGame = () => {
    console.log('end game')
    props.io.on(`${roomId}::endGame`, () => props.onEndGame())
    props.io.emit('endGame', roomId)
  }

  return <div>
  <div className="chart">
    <Chart data={users}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries
        valueField="money"
        argumentField="secretName"
      />
      <Title text={`Round ${room.round}`} />
      <Animation />
    </Chart>
  </div>
  <div className="button">
    { room.gameStatus === gameStatus.WAITING_PLAYERS && <Button variant="contained" color="primary" onClick={onStartGame}>Start</Button> }
    { room.gameStatus === gameStatus.ROUND_ENDED && <Button variant="contained" color="primary" onClick={onNextRound}>Next round</Button> }
    { room.gameStatus !== gameStatus.WAITING_PLAYERS && <Button variant="contained" color="primary" onClick={onEndGame}>End Game</Button> }
  </div>
</div>
}