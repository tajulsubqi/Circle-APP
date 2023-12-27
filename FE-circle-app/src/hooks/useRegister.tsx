import React, { useState } from "react"
import Api from "../lib/api"
import { useNavigate } from "react-router-dom"

const useRegister = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
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
      const response = await Api.post("/register", formData)
      console.log(response.data)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  }
}

export default useRegister
