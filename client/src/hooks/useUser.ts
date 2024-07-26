import { useQuery } from '@tanstack/react-query'
import { profile } from '@/api/auth'
import { User } from '@/types'

const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: profile,
    retry: false,
  })
}

export default useUser
