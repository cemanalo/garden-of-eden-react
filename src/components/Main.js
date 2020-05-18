import React, { useState, useEffect }from 'react';
import { Container, IconButton, Button, LinearProgress, Grid, ListItem, ListItemText } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import SendIcon from '@material-ui/icons/Send';

import appleConfig from '../utils/appleConfig'
import useStickyState from '../utils/useStickyState'
import pageComponent from '../utils/pageComponent'
import GameStatus from '../utils/gameStatus'
import roomService from '../services/room'
import userService from '../services/user'
import CheckIcon from '@material-ui/icons/Check';

import '../styles/main.css'
import gameStatus from '../utils/gameStatus';

export default function Main (props) {
  const [ userId ] = useStickyState("", "userId")
  const [ name ] = useStickyState("", "name")
  const [ roundText, setRoundText ] = useState("Waiting...")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ roomId ] = useStickyState("", "roomId")
  useEffect(() => {
    roomService.getRoomById(roomId).then(room => setRoom(room))
  }, [ roomId ])
  const [ room, setRoom ] = useState({})
  useEffect(() => {
    setRoundText(`Round ${room.round}`)
    props.io.on(`${roomId}::gameStarted`, () => {
      room.gameStatus = GameStatus.IN_PROGRESS
      setRoom(room)
    })

    props.io.on(`${roomId}::nextRound`, () => {
      roomService.getRoomById(roomId).then(room => {
        setRoom(room)
        setIsAppleSubmitted(false)
        setApple('')
        setRoundText(`Round ${room.round}`)
      })
    })
  }, [ props.io, room, roomId ])
  const [ secretName ] = useStickyState("", "secretName")
  const [ apple, setApple ] = useState("")
  const [ isAppleSubmitted, setIsAppleSubmitted ] = useState(false)
  const [ user, setUser ] = useState({})
  useEffect(() => {
    userService.getUser(userId, roomId).then(user => {
      const round = user.round
      setUser(user)
      setIsAppleSubmitted(round && !!round[room.round])
      setApple(round && round[room.round])
    })

    props.io.on(`${roomId}::nextRound`, () => {
      userService.getUser(userId, roomId).then(user => {
        setIsAppleSubmitted(false)
        setApple('')
        setUser(user)
      })
    })

    props.io.on(`${roomId}::showResult`, () => {
      userService.getUser(userId, roomId).then(user => {
        setUser(user)
      })
    })

    props.io.on(`${roomId}::endGame`, () => {
      props.setActiveComponent(pageComponent.END_RESULT)
    })
  }, [ props, userId, roomId, room, setUser ])

  const formatMoney = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0
  })

  const onAppleSubmitted = async () => {
    if(apple) {
      setIsLoading(true)
      await userService.submitApple(props.io, {userId, roomId}, room.round, apple)
      setIsAppleSubmitted(true)
      setIsLoading(false)
    }
    
  }

  const isButtonDisabled = () => {
    console.log('isButtonDisabled')
    return isAppleSubmitted || (room.gameStatus && GameStatus.isWaiting(room.gameStatus))
  }

  const renderHistory = () => {
    if (user.history && user.history.length > 1) {
      return user.history.map((value, index) => {
        if(value) {
          return <ListItem>
            <ListItemText>{index}. <span className={value > 0 ? 'gain' : 'lost'}>{value}</span></ListItemText>
          </ListItem>
        }

        return ''
      }).reverse()
    }
  }

  return <Container maxWidth="sm">
    <div className="hudBar">
      <div className="hud1">
      <div className="name"><span>Name: {name}</span></div>
      <div className="money"><span>{formatMoney.format(user.money || 0)}</span></div>
      </div>
      <div className="hud2">
      <div className="secretNameMain"><span>Secret: { secretName }</span></div>
      </div>
    </div>
    
    <div className="round">
      <span>{roundText}</span>
    </div>
    <div className="apples">
      <Grid container spacing={3}>
        <Grid item xs={4}>
            <IconButton onClick={() => setApple('Gold')}>
              <AppleIcon style={appleConfig.gold}></AppleIcon>
            </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => setApple('Silver')}>
            <AppleIcon style={appleConfig.silver}></AppleIcon>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => setApple('Red')}>
            <AppleIcon style={appleConfig.red}></AppleIcon>
          </IconButton>
        </Grid>
      </Grid>
      <div className="main choose">
        { room.gameStatus === gameStatus.WAITING_PLAYERS && <span>Waiting other players</span> }
        { room.gameStatus !== gameStatus.WAITING_PLAYERS && apple && <span>{apple} selected</span> }
        { room.gameStatus !== gameStatus.WAITING_PLAYERS && !apple && <span>Choose 1 apple</span> }
      </div>
    </div>
    <div className="progressBar">
        {isLoading && <LinearProgress />}
      </div>
    <div className="submitButton">
      <Button onClick={onAppleSubmitted} disabled={ isButtonDisabled() } variant="contained" color="primary" endIcon={ isAppleSubmitted ? <CheckIcon /> : <SendIcon />}>
        Submit
      </Button>
    </div>
    <div className="history">
      <div className="historyTitle">
        Round History
      </div>
      <div className="historyList">
        { renderHistory() }
      </div>
    </div>
  </Container>
}