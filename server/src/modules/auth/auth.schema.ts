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
    displayName: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
  },
  { additionalProperties: false }
)

export type LoginInputType = Static<typeof loginInputSchema>
export type RegisterInputType = Static<typeof registerInputSchema>
