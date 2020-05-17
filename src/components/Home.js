import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, LinearProgress } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AppleIcon from '@material-ui/icons/Apple';
import socketIOClient from "socket.io-client";
import { uuid } from 'uuidv4'

import useStickyState from '../utils/useStickyState'
import pageComponent from '../utils/pageComponent'
import roomService from '../services/room'

import homeIo from '../io/homeIo'

import '../styles/home.css'

export default function Home (props) {
  const [ roomId, setRoomId ] = useStickyState("", "roomId")
  const [ name, setName ] = useStickyState("", "name")
  useEffect(() => {
    setIsAdmin(name === 'admin')
  }, [ name ])
  const [ password, setPassword ] = useStickyState("", "password")
  const [ isAdmin, setIsAdmin ] = useState(false, "isAdmin")

  const [ isFormValid, setIsFormValid ] = useState(false)
  useEffect(() => {
    setIsFormValid(roomId && name)
  }, [roomId, name])

  const [ isLoading, setIsLoading ] = useState(false)
  const [ isRoomIdValid, setIsRoomIdValid ] = useState({ valid: true, message: ""})
  // eslint-disable-next-line no-unused-vars
  const [ secretName, setSecretName ] = useStickyState("", "secretName")
  // eslint-disable-next-line no-unused-vars
  const [ dateJoined, setDateJoined ] = useStickyState("", "dateJoined")
  const [ userId, setUserId ] = useStickyState('', 'userId')

  const onRoomIdChange = (event) => {
    const value = event.target.value
    setIsRoomIdValid({ valid: true, message: ""})
    setRoomId(value.toUpperCase())
  }

  const onNameChange = (event) => {
    const name = event.target.value
    setName(name)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onSubmitClick = async () => {
    if (isAdmin && password !== 'kaloypogi') {
      
      setIsRoomIdValid({
        valid: false,
        message: "Incorrect password"
      })
      return
    }

    if(isAdmin) {
      setSecretName('kaloypogi')
      setDateJoined((new Date()).toDateString())
    }

    setIsLoading(true)
    let thisUserId = userId
    if(!thisUserId) {
      thisUserId = uuid()
      setUserId(thisUserId)
    }

    try {
      const room = await roomService.getRoomById(roomId)
      console.log('aaaa', room)
      if (room) {
        props.setRoom(room)
        const socket = socketIOClient(process.env.REACT_APP_SOCKET_SERVER, { reconnectionAttempts: 20 })
        props.setIo(socket)
        homeIo.joinUser(socket, { roomId, userId: thisUserId, name }, (err, joinedUser) => {
          console.log(err, joinedUser)
          if (err) throw(err)

          if(!isAdmin) {
            setSecretName(joinedUser.secretName)
            setDateJoined(joinedUser.dateJoined)
            socket.emit('userJoined', name)
          }
          
          const component = isAdmin ? pageComponent.SCORE_BOARD : pageComponent.MAIN
          props.setActiveComponent(component)
        })
      } else {
        setIsLoading(false)
        setIsRoomIdValid({
          valid: false,
          message: "Room not found"
        })
      }
    } catch(error) {
      props.onConnectionError()
      setIsLoading(false)
    }
    
  }

  return <Container maxWidth="sm">
    <div className="title">
      <span>G<AppleIcon style={{ color: "red" }}/>rden of Eden</span>
      <div className="progressBar">
        {isLoading && <LinearProgress />}
      </div>
    </div>
    
    <div className="form">
      <div className="roomId">
        <TextField id="roomIdText" label="Room Id" onChange={onRoomIdChange} value={roomId} required autoFocus 
          error={!isRoomIdValid.valid} helperText={isRoomIdValid.message}
        />
      </div>
      <div className="name">
        <TextField id="nameText" label="Name" onChange={onNameChange} value={name} required />
      </div>
      { isAdmin && <div className="password">
          <TextField id="password" label="Password" onChange={onPasswordChange} value={password} required type="password" />
        </div>
      }
      
      <div className="submitButton">
        <Button variant="contained" color="primary" endIcon={<SendIcon />} disabled={!isFormValid || isLoading} onClick={onSubmitClick}>
          Submit
        </Button>
      </div>
    </div>
  </Container>
}
