import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import Api from "../../../../lib/api"

const useFormReplies = () => {
  const user = useSelector((state: RootState) => state.auth)

  type InputReplies = {
    content: string
    image: File | null
    userId: number
    threadId: number
  }

  const initialInputReplies: InputReplies = {
    content: "",
    image: null,
    userId: user.id, // assuming user.id is available in auth
    threadId: 0,
  }

  const [inputReplies, setInputReplies] = useState<InputReplies>(initialInputReplies)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === "image" && files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0])
      setImagePreview(imageUrl)
    }

    setInputReplies((prevInputReplies) => ({
      ...prevInputReplies,
      [name]: files ? files[0] : value,
    }))

    // Mencetak inputReplies.image setelah perubahan state terjadi
    console.log(inputReplies)
  }

  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("content", inputReplies.content)

      // Saring nilai inputReplies.image
      if (inputReplies.image instanceof File) {
        formData.append("image", inputReplies.image)
      }

      formData.append("userId", inputReplies.userId.toString())
      formData.append("threadId", inputReplies.threadId.toString())

      console.log(formData)

      const response = await Api.post("/replies", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setInputReplies(initialInputReplies)
      setImagePreview(null)

      console.log(response)
    } catch (error) {
      console.error("Error posting Replies:", error)
    }
  }

  return {
    inputReplies,
    imagePreview,
    handleChange,
    handlePostClick,
    setInputReplies,
  }
}

export default useFormReplies
