import { Avatar, Box, Text } from "@chakra-ui/react"
import { ChatText, Heart } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import Api from "../lib/api"
import InputSearch from "./InputThread"
import { Link } from "react-router-dom"
import { Thread } from "../types/ThreadType"

export const ListThread = () => {
  const [datas, setDatas] = useState<Thread[]>([])

  const fetchData = async () => {
    try {
      const response = await Api.get("/threads")
      setDatas(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [datas])

  return (
    <>
      <Box className="border-x p-4 mt-3">
        <Text className="text-lg font-semibold">Home</Text>

        <InputSearch placeholderText={"What is happening ?"} buttonText={"Post"} />

        {datas.map((data) => (
          <Box key={data.id} className="container flex gap-3 py-6 border-b">
            <Avatar bg="teal.500" size="md" />

            <Box>
              <Text className="text-sm font-medium">
                {data.user?.fullname}
                <span className="text-slate-500 ms-2">@{data.user?.username}</span>
              </Text>

              <Link to={`/detail/${data.id}`}>
                <img src={data.image} alt={data.fullname} className="rounded-md my-3" />
              </Link>

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
