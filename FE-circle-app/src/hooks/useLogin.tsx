import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../lib/api"
import { useDispatch } from "react-redux"
import { LOGIN_SUCCESS, USER_LOGIN } from "../store/slice/AuthSlice"
import { jwtDecode } from "jwt-decode"

const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await Api.post("login", formData)

      const data = response.data.token
      dispatch(LOGIN_SUCCESS(data))
      saveDataUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const saveDataUser = () => {
    const token = localStorage.getItem("token")
    if (token) {
      const data = jwtDecode(token)
      dispatch(USER_LOGIN(data))
    }
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  }
}

export default useLogin
