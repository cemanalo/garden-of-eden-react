export default {
  getGameRoomId: async (roomId) => {
    const res = await fetch(`/game/${roomId}`)
    return res.json()
  }
}