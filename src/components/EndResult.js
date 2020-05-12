import React, { useState, useEffect }from 'react';
import { Container, Button } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';

import '../styles/endResult.css'
import appleConfig from '../utils/appleConfig'
import userService from '../services/user'
import useStickyState from '../utils/useStickyState'

export default function EndResult(props) {
  const [ roomId ] = useStickyState("", "roomId")
  const [ users, setUsers ] = useState([])
  const [ winner, setWinner ] = useState({})
  useEffect(() => {
    userService.getUsersByRoomId(roomId).then(users => {
      const sorted = users.sort((a, b) => b.money - a.money)
      setWinner(sorted.shift())
      setUsers(sorted)
    })
  }, [roomId])
  

  const formatMoney = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0
  })

  const onBackSubmitted = () => {
    props.setActiveComponent('HOME')
  }

  const renderUsers = () => users.map(user => <li key={user.userId}>
      <span className="realName">{user.name}</span> <span className="secretName">({user.secretName}) {formatMoney.format(user.money || 0)}</span>
    </li>
  ) 

  return <Container maxWidth="sm">
    <div className="endResultTitle">
      <span>G<AppleIcon style={{ color: "red", fontSize: 12 }}/>rden of Eden</span>
    </div>
    <div className="winner">
      <div className="label">
        <AppleIcon style={{ color: appleConfig.gold.color, fontSize: 18 }} />
          Winner
        <AppleIcon style={{ color: appleConfig.silver.color, fontSize: 18 }} />
      </div>
      <div className="name">
        <span className="realName">{winner.name}</span>
      </div>
      <div className="secretNameWinner">
        as {winner.secretName}
      </div>
      <div className="finalMoney">
        {formatMoney.format(winner.money || 0)}
      </div>
    </div>
    <div className="loosers">
      <div className="loosersTitle">
        Loosers
      </div>
      <ul>
        {renderUsers()}
      </ul>
    </div>
    <div className="button">
    <Button onClick={onBackSubmitted} variant="contained" color="primary">
      Back
    </Button>
    </div>
  </Container>
}