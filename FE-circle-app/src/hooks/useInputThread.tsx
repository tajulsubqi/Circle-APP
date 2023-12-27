import { useState } from "react"
import Api from "../lib/api"
import { RootState } from "../store/store"
import { useSelector } from "react-redux"

type InputThread = {
  content: string
  image: File | null
  userId: number
}

const useInputThread = () => {
  const user = useSelector((state: RootState) => state.auth)

  const [inputThreads, setInputThreads] = useState<InputThread>({
    content: "",
    image: null,
    userId: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    setInputThreads({
      ...inputThreads,
      [name]: files ? files[0] : value,
      userId: user.id,
    })
  }

  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("content", inputThreads.content)
      formData.append("image", inputThreads.image as File)
      formData.append("userId", inputThreads.userId.toString())
      console.log(formData)

      const response = await Api.post("/threads", formData)
      console.log(response)

      // setThreads((prevThreads) => [newThread, ...prevThreads])
    } catch (error) {
      console.error("Error posting thread:", error)
    }
  }

  return {
    inputThreads,
    handlePostClick,
    handleChange,
  }
}

export default useInputThread
