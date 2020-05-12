export default {
  startGame(io, roomId) {
    io.emit('startGame', roomId)
  }
}