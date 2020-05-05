import React from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AppleIcon from '@material-ui/icons/Apple';

export default function Home () {
  return <Container maxWidth="sm">
    <div className="title">
      <span>G<AppleIcon style={{ color: "red" }}/>rden of Eden</span>
    </div>
    <div className="form">
      <div className="roomId">
        <TextField id="roomIdText" label="Room Id" />
      </div>
      <div className="name">
        <TextField id="nameText" label="Name" />
      </div>
      <div className="submitButton">
        <Button variant="contained" color="primary" endIcon={<SendIcon />}>
          Submit
        </Button>
      </div>
    </div>
  </Container>
}
