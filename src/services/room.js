export default {
  async getRoomById(roomid) {
    try {
      const room = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/room/${roomid}`)
      return await room.json()
    } catch(e) {
      console.log(e)
      return
    }
  },

  async endRound(roomId, round) {
    try {
      const result = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/room/${roomId}/round/${round}/endRound`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })
  
      return await result.json()
    } catch (e) {
      console.log(e)
      return
    }
  },

  async nextRound(roomId) {
    try {
      const room = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/room/${roomId}/nextRound`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })

      return await room.json()
    } catch (e) {
      console.log(e)
      return
    }
  }
}