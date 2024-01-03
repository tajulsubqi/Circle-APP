import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from "react-redux"
import { USER_LOGIN, USER_LOGOUT } from "../store/slice/AuthSlice"
import { RootState } from "../store/store"
import { Outlet, useNavigate } from "react-router-dom"

export default function PrivateRoute() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(auth)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const data = jwtDecode(token)
      dispatch(USER_LOGIN(data))
    } else {
      dispatch(USER_LOGOUT())
      navigate("/login")
    }
  }, [])

  return <>{auth.isAuthenticated ? <Outlet /> : "Loading..."}</>
}
