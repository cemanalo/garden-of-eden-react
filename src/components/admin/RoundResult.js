import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppleIcon from '@material-ui/icons/Apple';
import appleConfig from '../../utils/appleConfig'

export default function RoundResult () {
  return <div className="roundResult">
    <div class="round">
      <span>Round 1</span>
    </div>
    <div className="appleResult">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className="gold">
            <div className="appleTitle"><AppleIcon style={appleConfig.gold} /></div>
            <div className="voteCount"><span>0</span></div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="silver">
            <div className="appleTitle"><AppleIcon style={appleConfig.silver} /></div>
            <div className="voteCount"><span>0</span></div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="red">
            <div className="appleTitle"><AppleIcon style={appleConfig.red} /></div>
            <div className="voteCount"><span>0</span></div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </div>
}