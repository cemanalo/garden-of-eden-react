import userService from '../services/user'

export default {
  joinUser(io, user, callback) {
    console.log("JOINUSER", user)
    const { roomId, userId, name } = user
    io.on('connect', async () => {
      try {
        const joinedUser = await userService.joinUser({
          roomId,
          userId,
          name
        })
        console.log('connected', joinedUser)
        callback(null, joinedUser)
      } catch(e) {
        callback(e)
      }
    })
  }

}
