import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  Stack,
  Center,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa"
import { IoEyeOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { handleSubmit, handleInputChange } = useLogin()

  return (
    <ChakraProvider>
      <Center height="100vh">
        <Box p={4} borderRadius="xl" boxShadow="md" width={{ base: "100%", md: "30%" }}>
          <form onSubmit={handleSubmit}>
            <Text fontSize={"5xl"} color={"green"} fontWeight="semibold">
              circle
            </Text>
            <Text fontSize={"4xl"} mb={4} fontWeight={"medium"}>
              Login account circle
            </Text>
            <Stack spacing={4}>
              <FormControl isRequired>
                <Input
                  focusBorderColor="green.400"
                  py={7}
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email / Username"
                />
              </FormControl>

              <InputGroup size="md">
                <Input
                  focusBorderColor="green.400"
                  py={6}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
                <InputRightElement width="5rem">
                  <Button mt={2} ml={7} bg={"transparent"} onClick={handleClick}>
                    {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Text fontSize={"sm"} textAlign={"right"}>
                Forgot password ?
              </Text>

              <Button
                py={6}
                fontSize={"xl"}
                rounded={"full"}
                type="submit"
                bg={"green"}
                _hover={{ bg: "green.500" }}
                transitionDuration={"300ms"}
                width="100%"
              >
                Login
              </Button>
              <Text>
                Don't have an account yet ?{" "}
                <Link
                  to={"/register"}
                  className="cursor-pointer text-green-600 hover:underline duration-300 transition"
                >
                  Create account
                </Link>{" "}
              </Text>
            </Stack>
          </form>
        </Box>
      </Center>
    </ChakraProvider>
  )
}

export default LoginForm
