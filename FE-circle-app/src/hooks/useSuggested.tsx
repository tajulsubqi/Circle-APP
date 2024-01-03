import { useEffect, useState } from "react"
import Api from "../lib/api"

interface UserSuggested {
  id: number
  fullname: string
  username: string
  profile_picture: string
  profile_description: string
}

const useSuggested = () => {
  const [suggestedUsers, setSuggestedsUsers] = useState<UserSuggested[]>([])

  const fetchSuggestedUsers = async () => {
    try {
      const response = await Api.get("/users")
      setSuggestedsUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSuggestedUsers()
  }, [])
  return {
    suggestedUsers,
  }
}

export default useSuggested
