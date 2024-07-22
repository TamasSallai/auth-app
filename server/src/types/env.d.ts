import { FastifySessionObject } from '@fastify/session'
import { User } from './types'

declare module '@fastify/session' {
  interface FastifySessionObject {
    user?: User
  }
}

export {}
