import fastify, { FastifyServerOptions } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import Redis from 'ioredis'
import RedisStore from 'connect-redis'
import config from './config/config'
import authRouter from './modules/auth/auth.router'

const redisClient = new Redis(config.redis_url)
const redisStore = new RedisStore({ client: redisClient })

const opts: FastifyServerOptions = { logger: true }
if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: 'pino-pretty',
    },
  }
}
const app = fastify(opts)
app.register(fastifyCors, {
  origin: config.cors_origin,
  credentials: true,
})
app.register(fastifyCookie)
app.register(fastifySession, {
  store: redisStore,
  secret: config.cookie_secret,
  cookie: {
    maxAge: config.cookie_ttl,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
})
app.register(authRouter, { prefix: '/api/auth' })

app.setErrorHandler(async (err, _, reply) => {
  return reply.status(err.statusCode || 500).send({
    success: false,
    error: err,
  })
})

export default app
