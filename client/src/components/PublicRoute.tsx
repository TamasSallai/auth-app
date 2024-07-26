import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUser from '@/hooks/useUser'

const PublicRoute = () => {
  const location = useLocation()
  const { data: user, isLoading } = useUser()

  if (isLoading) return <div>...loading</div>

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  )
}

export default PublicRoute
