export default {
  getGameRoomId: async (roomId) => {
    const res = await fetch(`${process.env.REACT_APP_SOCKET_SERVER}/game/${roomId}`)
    return res.json()
  }
}