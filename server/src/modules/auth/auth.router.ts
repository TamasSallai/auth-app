import { FastifyPluginAsync } from 'fastify'
import bcrypt from 'bcrypt'
import {
  loginInputSchema,
  LoginInputType,
  registerInputSchema,
  RegisterInputType,
} from './auth.schema'
import { createUser, findUserByEmail } from './auth.service'
import { ConflictError, UnauthorizedError } from '@/utils/customErrors'

const authRouter: FastifyPluginAsync = async (app) => {
  app.post<{ Body: RegisterInputType }>(
    '/register',
    { schema: { body: registerInputSchema } },
    async (req, reply) => {
      const data = req.body

      const user = await findUserByEmail(data.email)
      if (user) {
        throw new ConflictError('User with email already exists')
      }

      const registeredUser = await createUser(data)

      const userPayload = {
        id: registeredUser.id,
        email: registeredUser.email,
        displayName: registeredUser.displayName,
        isVerified: registeredUser.isVerified,
      }

      req.session.user = userPayload

      return reply.status(201).send({
        success: true,
        user: userPayload,
      })
    }
  )

  app.post<{ Body: LoginInputType }>(
    '/login',
    { schema: { body: loginInputSchema } },
    async (req, reply) => {
      const { email, password } = req.body

      const user = await findUserByEmail(email)
      if (!user) {
        throw new UnauthorizedError('Invalid email or password')
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password)
      if (!isCorrectPassword) {
        throw new UnauthorizedError('Invalid email or password')
      }

      const userPayload = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isVerified: user.isVerified,
      }

      req.session.user = userPayload

      return reply.status(200).send({
        success: true,
        user: userPayload,
      })
    }
  )

  app.get('/logout', async (req, reply) => {
    await req.session.destroy()

    return reply.clearCookie('sessionId').send({
      success: true,
      message: 'User logged out',
    })
  })

  app.get('/profile', async (req, reply) => {
    const user = req.session.user

    if (!user) {
      throw new UnauthorizedError('Invalid user session')
    }

    return reply.send({
      success: true,
      user,
    })
  })
}

export default authRouter
