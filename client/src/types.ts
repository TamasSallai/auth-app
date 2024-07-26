export type SignInFormData = {
  email: string
  password: string
}

export type SignUpFormData = {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
  password: string
  confirmPassword: string
}

export type SignInPayload = SignInFormData

export type SignUpPayload = Omit<SignUpFormData, 'confirmPassword'>

export type User = {
  displayName: string
  firstName?: string
  lastName?: string
  email: string
  isVerified: boolean
}
