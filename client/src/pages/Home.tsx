import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../api/auth'

const Home = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default Home
