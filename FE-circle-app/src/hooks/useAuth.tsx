import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const useAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate("/")
  }
  return { user, handleChangeInput, handleSubmit }
}

export default useAuth
