import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePages"
import RegisterForm from "./pages/RegisterPages"
import LoginForm from "./pages/LoginPages"
import DetailPages from "./pages/DetailPages"

import SearchPages from "./pages/SearchPages"
import Follows from "./pages/FollowsPages"
import ProfilePages from "./pages/ProfilePages"
import PrivateRoute from "./lib/PrivateRoute"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailPages />} />
            <Route path="/search" element={<SearchPages />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<ProfilePages />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
