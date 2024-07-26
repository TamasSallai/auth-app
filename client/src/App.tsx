import { Navigate, Route, Routes } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import ProtectRoute from './components/ProtectRoute'
import Missing from './pages/Missing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<ProtectRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="/*" element={<Missing />} />
    </Routes>
  )
}

export default App
