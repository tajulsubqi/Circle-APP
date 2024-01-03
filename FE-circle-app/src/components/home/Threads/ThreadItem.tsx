import { Avatar, Box, Text } from "@chakra-ui/react"
import { ChatText, Heart } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Thread } from "../../../types"
import Api from "../../../lib/api"
import FormThread from "./FormThread"

export const ThreadItem = () => {
  const [threads, setThreads] = useState<Thread[]>([])

  const fetchData = async () => {
    try {
      const response = await Api.get("/threads")
      setThreads(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Box className="border-x border-slate-400 p-4 mt-3">
        <Text className="text-lg font-semibold">Home</Text>

        <FormThread placeholderText={"What is happening ?"} buttonText={"Post"} />

        {threads.map((data) => (
          <Box key={data.id} className="container flex gap-3 py-6 border-b">
            <Avatar src={data.profile_picture} size="md" />

            <Box>
              <Link to={`/detail/${data.id}`}>
                <Text className="text-sm font-medium">
                  {data.user?.fullname}
                  <span className="text-slate-500 ms-2">@{data.user?.username}</span>
                </Text>
              </Link>

              <img
                src={data.image}
                alt={data.image}
                className="rounded-md my-3 w-[700px] h-[450px] object-cover  flex justify-center bg-slate-200 "
              />

              <p className="text-[13px] mt-1">{data.content}</p>

              <Box className="mt-3 flex gap-7">
                <span className="flex items-center text-[12px] gap-3">
                  <Heart size={20} />
                  {/* {data.like} */}
                </span>
                <span className="flex items-center text-[12px] gap-2">
                  <ChatText size={20} />
                  {/* {data.chat} */}
                </span>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}
