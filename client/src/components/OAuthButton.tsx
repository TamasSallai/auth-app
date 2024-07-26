import googleIcon from '@/assets/icons/google.svg'
import githubIcon from '@/assets/icons/github.svg'

type Props = {
  provider: 'google' | 'github'
}

const OAuthButton = ({ provider }: Props) => {
  const icons = {
    google: googleIcon,
    github: githubIcon,
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const formattedProvider = provider.charAt(0).toUpperCase() + provider.slice(1)

  return (
    <a
      className="px-4 py-2 flex flex-row items-center gap-3  justify-center font-medium rounded-sm bg-white outline outline-1 outline-gray-400 transition-shadow duration-300 hover:shadow-md "
      href={`${BACKEND_URL}/api/auth/${provider}/login`}
    >
      <img className="w-5 h-5" src={icons[provider]} alt={`${provider} icon`} />
      <span>Sign in with {formattedProvider}</span>
    </a>
  )
}

export default OAuthButton
