export default {
  async getUsersByRoomId(roomId) {
    const res = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/users?roomId=${roomId}`)
    return await res.json()
  },

  async joinUser(user) {
    const { userId, roomId, name } = user

    const res = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/room/${roomId}/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    })

    return res.json()
  },

  async submitApple(io, user, round, apple) {
    const { userId, roomId } = user
    
    const res = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/user/${userId}/room/${roomId}/submitApple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        round, apple
      })
    })

    const data = await res.json()
    io.emit(`appleSubmitted`, { round, roomId })
    console.log('APPLE_SUBMITTED', { ...data, roomId } )
    return data
  },

  async getUser(userId, roomId) {
    const res = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/user/${userId}/room/${roomId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await res.json()
  }
}