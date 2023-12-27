import React from "react"
import { RiUserSearchLine } from "react-icons/ri"
import { Heart, House, UserCircle } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { LuLogIn } from "react-icons/lu"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import ModalPost from "./ModalPost"
import { useDispatch } from "react-redux"
import { USER_LOGOUT } from "../store/slice/AuthSlice"

const SideBar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(USER_LOGOUT())
  }

  return (
    <>
      <Box className="fixed Text-4 px-10 mt-5">
        <Box className="flex items-center gap-8">
          <Text className="text-6xl font-bold text-green-500">circle</Text>
          <Button bg="transparent" marginTop={5} onClick={toggleColorMode}>
            {colorMode === "dark" ? <FaRegSun size={20} /> : <FaRegMoon size={20} />}
          </Button>
        </Box>

        <Box className="flex flex-col gap-5 pt-7">
          <Link
            to={"/"}
            className="flex items-center gap-2 hover:text-green-500 transition duration-300"
          >
            <House size={28} weight="fill" className="text-bold" />
            <Text className="font-semibold ">Home</Text>
          </Link>
          <Link
            to={"#"}
            className="flex items-center gap-2 hover:text-green-500 transition duration-300"
          >
            <RiUserSearchLine size={28} />
            <Text className="font-semibold ">Search</Text>
          </Link>
          <Link
            to={"#"}
            className="flex items-center gap-2 hover:text-green-500 transition duration-300"
          >
            <Heart size={28} className="text-bold" />
            <Text className="font-semibold">Follows</Text>
          </Link>
          <Link
            to={"#"}
            className="flex items-center gap-2 mb-5 hover:text-green-500 transition duration-300"
          >
            <UserCircle size={28} className="text-bold" />
            <Text className="font-semibold">Profile</Text>
          </Link>

          <div>
            <ModalPost />
          </div>

          <Box
            onClick={handleLogout}
            fontSize={18}
            color={"gray.400"}
            display={"flex"}
            gap={3}
            alignItems={"center"}
            mt={20}
            _hover={{ color: "green.300" }}
            transitionDuration={"300ms"}
          >
            <LuLogIn size={22} />
            <Link to={"/login"}>Logout</Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SideBar
