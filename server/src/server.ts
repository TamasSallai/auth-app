import closeWithGrace from 'close-with-grace'
import config from './config/config'
import app from './app'

const { host, port } = config
app.listen({ host, port }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

closeWithGrace({ delay: 200 }, async ({ signal, err }) => {
  if (err) {
    app.log.error({ err }, 'server closing with error')
  } else {
    app.log.info(`${signal} recieved, server closing`)
  }
  await app.close()
})
