import { useEffect, useState } from "react"
import { DetailThread } from "../types/ThreadType"
import { useParams } from "react-router-dom"
import Api from "../lib/api"

const useThreadDetail = () => {
  const [detailThread, setDetailThread] = useState<DetailThread | null>(null)
  const { id } = useParams()

  const fetchDataId = async () => {
    try {
      const response = await Api.get(`/threads/${id}`)
      setDetailThread(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataId()
  }, [])

  return {
    detailThread,
  }
}

export default useThreadDetail
