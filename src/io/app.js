export default function (io, setConnectionStatus) {
  io.on('connect', () => {
    setConnectionStatus({
      value: 'success',
      message: 'Connected'
    })
  })
  io.on('disconnect', () => {
    setConnectionStatus({
      value: 'failed',
      message: 'Disconnected'
    })
  })
  io.on('reconnecting', () => {
    setConnectionStatus({
      value: 'failed',
      message: 'Reconnecting...'
    })
  })
  io.on('reconnect', () => {
    setConnectionStatus({
      value: 'success',
      message: 'Connected'
    })
  })
  io.on('reconnect_error', () => {
    setConnectionStatus({
      value: 'failed',
      message: 'Connection failed'
    })
  })
  io.on('reconnect_failed', () => {
    setConnectionStatus({
      value: 'failed',
      message: 'Connection failed'
    })
  })
}