import React from 'react';
import { Container, IconButton, Button } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

import appleConfig from '../utils/appleConfig'

import '../styles/main.css'

export default function Main () {
  return <Container maxWidth="sm">
    
    <div className="hudBar">
      <div className="hud1">
        <div className="name"><span>Gongdee</span></div>
        <div className="money"><span>₱ 0.00</span></div>
      </div>
      <div className="hud2">
        <div className="secretName"><span>Secret name: DOLE</span></div>
      </div>
    </div>
    
    <div className="round">
      <span>Round 1</span>
    </div>
    <div className="apples">
      <Grid container spacing={3}>
        <Grid item xs={4} justify="center" alignItems="center">
          <IconButton>
            <AppleIcon style={appleConfig.gold}></AppleIcon>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton>
            <AppleIcon style={appleConfig.silver}></AppleIcon>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton>
            <AppleIcon style={appleConfig.red}></AppleIcon>
          </IconButton>
        </Grid>
      </Grid>
      <div className="main choose">
        <span>Choose 1 apple</span>
        {/* <span>G<AppleIcon style={{ color: "red", fontSize: 15}}/>rden of Eden</span> */}
      </div>
    </div>
    
    <div className="submitButton">
      <Button variant="contained" color="primary" endIcon={<SendIcon />}>
        Submit
      </Button>
    </div>
  </Container>
}