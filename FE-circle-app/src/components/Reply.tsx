import { Avatar, Box, Flex, Text, WrapItem } from "@chakra-ui/react"
import { BsChatDots } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import useThreadDetail from "../hooks/useThreadDetail"

const Reply = () => {
  const { detailThread } = useThreadDetail()

  return (
    <>
      <Box>
        <Box borderBottom={"1px solid gray"} pb={9}>
          <Flex alignItems={"center"} mt={10}>
            <WrapItem>
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </WrapItem>

            <Box marginLeft={5} display={"inline-block"}>
              <Text fontSize={"md"}>{detailThread?.fullname}</Text>
              <Text fontSize={"sm"} color={"gray"}>
                {detailThread?.email}
              </Text>
            </Box>
          </Flex>
          <Text mt={5} fontSize={15}>
            {detailThread?.content}
          </Text>

          <Box display={"flex"} justifyContent={"start"} mt={5}>
            <Box display={"flex"} alignItems={"center"}>
              <FaRegHeart />
              <Text fontSize={12} ml={2}>
                {detailThread?.like} like
              </Text>
            </Box>
            <Box display={"flex"} alignItems={"center"} ml={8}>
              <BsChatDots />
              <Text fontSize={12} ml={2}>
                {detailThread?.comment} comment
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Reply
