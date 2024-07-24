import { Type, Static } from '@sinclair/typebox'

export const loginInputSchema = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false }
)

export const registerInputSchema = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    displayName: Type.String(),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false }
)

export type LoginInputType = Static<typeof loginInputSchema>
export type RegisterInputType = Static<typeof registerInputSchema>
