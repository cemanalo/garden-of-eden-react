import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppleIcon from '@material-ui/icons/Apple';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { Button, LinearProgress } from '@material-ui/core';

import appleConfig from '../../utils/appleConfig'
import useStickyState from '../../utils/useStickyState'
import userService from '../../services/user'
import roomService from '../../services/room'

export default function RoundResult (props) {
  const [ roomId ] = useStickyState("", "roomId")
  useEffect(() => {
    props.io.on(`${roomId}::appleSubmitted`, () => {
      userService.getUsersByRoomId(roomId).then(users => setUsers(users))
    })
  }, [ props.io, roomId ])
  const [ room, setRoom ] = useState({})
  useEffect(() => {
    roomService.getRoomById(roomId).then(room => setRoom(room))
  }, [ roomId ])

  const [ users, setUsers ] = useState([])
  useEffect(() => {
    userService.getUsersByRoomId(roomId).then(users => setUsers(users))
  }, [roomId])

  const [ result, setResult ] = useState([])
  const [ isShowResult, setIsShowResult ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const renderUsers = () => {
    const round = room.round
    console.log('round', round)
    return users.map(user => <ListItem key={user.userId}>
      <ListItemIcon>
        { user.round && user.round[round] ? <LockIcon style={ { color: 'green' }}/> : <LockOpenIcon />}
      </ListItemIcon>
      <ListItemText>{user.isRevealName ? user.name : user.secretName}</ListItemText>
    </ListItem>)

  }

  const onEndRoundClick = async () => {
    setIsLoading(true)
    const result = await roomService.endRound(roomId, room.round)
    setResult(result)
    setIsLoading(false)
  }

  const onShowResultClick = () => {
    setIsShowResult(true)
    props.io.emit('showResult', roomId)
  }

  const onBackClick = () => {
    props.setActiveComponent('CHART')
  }

  const getGold = () => result.filter(user => user.round[room.round] === 'Gold')

  const getSilver = () => result.filter(user => user.round[room.round] === 'Silver')

  const getRed = () => result.filter(user => user.round[room.round] === 'Red')

  return <div className="roundResult">
    <div className="round">
      <span>Round {room.round}</span>
    </div>
    <div className="appleResult">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className="gold">
            <div className="appleTitle"><AppleIcon style={appleConfig.gold} /></div>
            <div className="voteCount"><span>{ isShowResult ? getGold().length : 0}</span></div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="silver">
            <div className="appleTitle"><AppleIcon style={appleConfig.silver} /></div>
            <div className="voteCount"><span>{ isShowResult ? getSilver().length : 0}</span></div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="red">
            <div className="appleTitle"><AppleIcon style={appleConfig.red} /></div>
            <div className="voteCount"><span>{ isShowResult ? getRed().length : 0}</span></div>
          </Paper>
        </Grid>
      </Grid>
    </div>
    <div className="loading">
      { isLoading && <LinearProgress />}
    </div>
    <div className="button">
      { result.length === 0 && <Button disabled={isLoading} variant="contained" color="primary" onClick={onEndRoundClick}>End Round</Button> }
      { result.length > 0 && <Button variant="contained" color="primary" onClick={onShowResultClick}>Show Result</Button> }
      { result.length > 0 && <Button variant="contained" color="primary" onClick={onBackClick}>Back</Button> }
    </div>
    <div className="users">
      <List>
        {renderUsers()}
      </List>
    </div>
  </div>
}