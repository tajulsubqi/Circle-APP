import { RiUserSearchLine } from "react-icons/ri"
import { Heart, House, UserCircle } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import { LuLogIn } from "react-icons/lu"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"
import { FaRegMoon, FaRegSun } from "react-icons/fa"
import ModalPost from "./ModalPost"
import { useDispatch, useSelector } from "react-redux"
import { USER_LOGOUT } from "../../store/slice/AuthSlice"
import { RootState } from "../../store/store"

const SideBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const { colorMode, toggleColorMode } = useColorMode()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(USER_LOGOUT())
  }

  return (
    <>
      <Box className="fixed text-4 px-10 mt-5">
        <Box className="flex items-center gap-8">
          <Text className="text-6xl font-bold text-green-500">circle</Text>
          <Button bg="transparent" marginTop={5} onClick={toggleColorMode}>
            {colorMode === "dark" ? <FaRegSun size={20} /> : <FaRegMoon size={20} />}
          </Button>
        </Box>

        <Box className="flex flex-col gap-5 pt-7">
          <NavLink
            to={"/"}
            style={{
              color:
                location.pathname === "/"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : colorMode === "dark"
                  ? "white"
                  : "black",
            }}
            className="flex items-center gap-2"
          >
            <House size={28} weight="fill" className="text-bold" />
            <Text className="font-semibold hover:text-green-500 transition duration-300">
              Home
            </Text>
          </NavLink>

          <NavLink
            to={"/search"}
            style={{
              color:
                location.pathname === "/search"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : colorMode === "dark"
                  ? "white"
                  : "black",
            }}
            className="flex items-center gap-2"
          >
            <RiUserSearchLine size={28} />
            <Text className="font-semibold hover:text-green-500 transition duration-300">
              Search
            </Text>
          </NavLink>

          <NavLink
            to={"/follows"}
            style={{
              color:
                location.pathname === "/follows"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : colorMode === "dark"
                  ? "white"
                  : "black",
            }}
            className="flex items-center gap-2 hover:text-green-500 transition duration-300"
          >
            <Heart size={28} className="text-bold" />
            <Text className="font-semibold hover:text-green-500 transition duration-300">
              Follow
            </Text>
          </NavLink>

          <NavLink
            to={"/profile"}
            style={{
              color:
                location.pathname === "/profile"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : colorMode === "dark"
                  ? "white"
                  : "black",
            }}
            className="flex items-center gap-2 mb-5 hover:text-green-500 transition duration-300"
          >
            <UserCircle size={28} className="text-bold" />
            <Text className="font-semibold hover:text-green-500 transition duration-300">
              Profile
            </Text>
          </NavLink>

          <div>
            <ModalPost />
          </div>

          <Box
            onClick={isAuthenticated ? handleLogout : undefined}
            fontSize={18}
            color={"gray.400"}
            display={"flex"}
            gap={3}
            alignItems={"center"}
            mt={20}
            _hover={{ color: "green.500" }}
            transitionDuration={"300ms"}
          >
            {isAuthenticated ? (
              <NavLink to={"/login"} className="flex items-center gap-3">
                {" "}
                <FiLogOut size={22} /> Logout
              </NavLink>
            ) : (
              <NavLink to={"/login"} className="flex items-center gap-3">
                {" "}
                <LuLogIn size={22} /> Login
              </NavLink>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SideBar
