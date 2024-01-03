import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import Api from "../../../../lib/api"

type InputThread = {
  content: string
  image: File | null
  userId: number
}

type UseInputThreadHook = {
  inputThreads: InputThread
  imagePreview: string | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePostClick: (e: React.FormEvent) => Promise<void>
}

const useInputThread = (): UseInputThreadHook => {
  const user = useSelector((state: RootState) => state.auth)

  const initialInputThreads: InputThread = {
    content: "",
    image: null,
    userId: 0,
  }

  const [inputThreads, setInputThreads] = useState<InputThread>(initialInputThreads)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0])
      setImagePreview(imageUrl)
    }

    setInputThreads((prevInputThreads) => ({
      ...prevInputThreads,
      [name]: files ? files[0] : value,
      userId: user.id,
    }))
  }

  useEffect(() => {
    console.log(inputThreads)
  }, [inputThreads])

  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!inputThreads.image) {
        // Handle when the image is empty
        return
      }

      const formData = new FormData()
      formData.append("content", inputThreads.content)
      formData.append("image", inputThreads.image)
      formData.append("userId", inputThreads.userId.toString())

      const response = await Api.post("/threads", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(response.data)

      // Reset inputThreads to initial state
      setInputThreads(initialInputThreads)
      setImagePreview(null)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(inputThreads)
  }, [inputThreads])

  return {
    inputThreads,
    handlePostClick,
    handleChange,
    imagePreview,
  }
}

export default useInputThread
