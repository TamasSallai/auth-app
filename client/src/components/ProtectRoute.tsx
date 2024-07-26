import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUser from '@/hooks/useUser'

const ProtectRoute = () => {
  const location = useLocation()
  const { data: user, isLoading } = useUser()

  if (isLoading) return <div>...loading</div>

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default ProtectRoute
