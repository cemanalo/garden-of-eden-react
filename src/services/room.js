export default {
  async getRoomById(roomid) {
    try {
      const room = await fetch(`/room/${roomid}`)
      return await room.json()
    } catch(e) {
      console.log(e)
      return
    }
  },

  async endRound(roomId, round) {
    try {
      const result = await fetch(`/room/${roomId}/round/${round}/endRound`, {
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
      const room = await fetch(`/room/${roomId}/nextRound`, {
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