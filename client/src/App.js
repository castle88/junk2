import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import PrivateRoute from './components/PrivateRoute'
import Reset from './pages/Reset'
import Home from './pages/Home'
import { CssBaseline } from "@mui/material"

function App() {
  return (
    <>
    <CssBaseline />
    <Router>
      <Routes>
        <Route exact element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
        </Route>
        
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgotPassword' element={<Forgot />} />
        <Route exact path='/resetPassword/:resetToken' element={<Reset />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
