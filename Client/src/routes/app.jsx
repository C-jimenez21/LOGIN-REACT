import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Profile from '../pages/Profile'
import Logout from '../components/Logout'
import { AuthProvider, AuthRoute } from '../config/auth'
export default function App() {
  return (
    <>
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<AuthRoute><Profile/></AuthRoute>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    </>
  )
}
