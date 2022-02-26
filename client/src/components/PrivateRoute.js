import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
	let userId = localStorage.getItem('authtoken') === null ? false : true

  return (
    <>{userId ? <Outlet /> : <Navigate to='/login' />}</>
  )
}
