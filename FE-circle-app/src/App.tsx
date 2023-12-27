import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import RegisterForm from "./pages/Register"
import LoginForm from "./pages/Login"
import DetailPages from "./pages/DetailPages"
import { USER_LOGIN } from "./store/slice/AuthSlice"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      const data = jwtDecode(token)
      dispatch(USER_LOGIN(data))
    }
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailPages />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/Login" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
