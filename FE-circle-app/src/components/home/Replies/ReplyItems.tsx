import { Avatar, Box, Flex, Text, WrapItem } from "@chakra-ui/react"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { BsChatDots } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import { useParams } from "react-router-dom"
import Api from "../../../lib/api"

const ReplyItems = () => {
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{
    profile_picture: string
    fullname: string
    username: string
    id: number
  }>(token)

  const { id } = useParams()

  const [dataReplies, setDataReplies] = useState([])

  const fetchData = async () => {
    try {
      const response = await Api.get(`/replies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      console.log(response.data.data) // Log respons API
      setDataReplies(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Box>
        {dataReplies?.map((data: any) => (
          <Box key={data.id} borderBottom={"1px solid gray"} pb={9}>
            <Flex alignItems={"center"} mt={10}>
              <WrapItem>
                <Avatar name="Christian Nwamba" src={user.profile_picture} />
              </WrapItem>

              <Box marginLeft={5} display={"inline-block"}>
                <Text fontSize={"md"}>{user.fullname}</Text>
                <Text fontSize={"sm"} color={"gray"}>
                  {user.username}
                </Text>
              </Box>
            </Flex>
            <Text mt={5} fontSize={15}>
              {data.content}
            </Text>

            <Box w={"40%"}>
              <img src={data.image} alt={data.image} />
            </Box>

            <Box display={"flex"} justifyContent={"start"} mt={5}>
              <Box display={"flex"} alignItems={"center"}>
                <FaRegHeart />
                <Text fontSize={12} ml={2}>
                  {data.like} like
                </Text>
              </Box>
              <Box display={"flex"} alignItems={"center"} ml={8}>
                <BsChatDots />
                <Text fontSize={12} ml={2}>
                  {/* {detailThread?.comment} comment */}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ReplyItems
