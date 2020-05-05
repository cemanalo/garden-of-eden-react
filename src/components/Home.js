import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AppleIcon from '@material-ui/icons/Apple';

export default function Home () {
  const [ roomId, setRoomId ] = useState("")
  const [ name, setName ] = useState("")
  const [ isFormValid, setIsFormValid ] = useState(false)

  useEffect(() => {
    setIsFormValid(roomId && name)
  }, [roomId, name])

  const onRoomIdChange = (event) => {
    const value = event.target.value
    setRoomId(value.toUpperCase())
  }


  const onNameChange = (event) => {
    setName(event.target.value)
  }

  return <Container maxWidth="sm">
    <div className="title">
      <span>G<AppleIcon style={{ color: "red" }}/>rden of Eden</span>
    </div>
    <div className="form">
      <div className="roomId">
        <TextField id="roomIdText" label="Room Id" onChange={onRoomIdChange} value={roomId} required autoFocus />
      </div>
      <div className="name">
        <TextField id="nameText" label="Name" onChange={onNameChange} value={name} required />
      </div>
      <div className="submitButton">
        <Button variant="contained" color="primary" endIcon={<SendIcon />} disabled={!isFormValid}>
          Submit
        </Button>
      </div>
    </div>
  </Container>
}
