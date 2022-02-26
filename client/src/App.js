import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import { CssBaseline } from "@mui/material"

function App() {
  return (
    <>
    <CssBaseline />
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgotPassword' element={<Forgot />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
