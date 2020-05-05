import React from 'react';
import { Container, Button } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import ChartComponent from './ChartComponent'
import RoundResult from './RoundResult'

import '../../styles/admin/score_board.css'

export default function ScoreBoard () {

  return <Container maxWidth={"md"}>
    <div className="topData">
      <div className="room">
        <span>Room: ABCD</span>
      </div>
      <div class="roundText">
        <span>G<AppleIcon style={{ color: "red" }}/>rden of Eden</span>
      </div>
      {/* <ChartComponent /> */}
      <RoundResult />
      <div className="button">
        <Button variant="contained" color="primary">End Round</Button>
      </div>
    </div>
  </Container>
}
