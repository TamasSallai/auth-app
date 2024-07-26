import axios from './axios'
import { SignInPayload, SignUpPayload, User } from '@/types'

export const login = async (payload: SignInPayload): Promise<User> => {
  try {
    const { data } = await axios.post('/auth/login', payload)
    return data.user
  } catch (error) {
    throw error
  }
}

export const register = async (payload: SignUpPayload): Promise<User> => {
  try {
    const { data } = await axios.post('/auth/register', payload)
    return data.user
  } catch (error) {
    throw error
  }
}

export const profile = async (): Promise<User | null> => {
  try {
    const { data } = await axios.get('/auth/profile')
    return data.user
  } catch (error) {
    return null
  }
}

export const logout = async (): Promise<void> => {
  await axios.get('/auth/logout')
}
