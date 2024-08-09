import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { login } from '@/api/auth'
import { SignInFormData, SignInPayload } from '@/types'
import InputGroup from '@/components/InputGroup'
import Separator from '@/components/Separator'
import OAuthButton from '@/components/OAuthButton'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'

const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: (payload: SignInPayload) => login(payload),
    onSuccess: () => navigate(from, { replace: true }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        const data = error.response?.data // response data
        const message: string = data ? data.message : 'Something went wrong'
        setError('root', { type: 'custom', message })
      }
    },
  })

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="bg-gray-50 h-screen">
      <div className="max-w-md mx-auto px-5 flex flex-col gap-4">
        <h1 className="my-5 text-3xl font-bold sm:text-4xl">Sign In.</h1>

        <OAuthButton provider="google" />
        <OAuthButton provider="github" />

        <Separator>or sign in with e-mail</Separator>

        {errors.root && <ErrorMessage message={errors.root.message!} />}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            id="email"
            label="E-mail"
            type="text"
            placeholder="example@email.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            fieldError={errors.email}
          />

          <InputGroup
            id="password"
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Must be 6 or more character',
              },
            })}
            fieldError={errors.password}
          />

          <Link className="self-end font-medium text-blue-600" to="/">
            Forgot password?
          </Link>

          <Button isLoading={mutation.isPending}>Sign In</Button>
        </form>
        <p>
          Don't have and account?{' '}
          <Link className="font-medium text-blue-600" to="/signup">
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
