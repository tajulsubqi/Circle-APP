import { useState } from "react"
import { IoEyeOutline } from "react-icons/io5"
import { FaRegEyeSlash } from "react-icons/fa"
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  Stack,
  Center,
  Text,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useRegister from "../hooks/useRegister"

const RegisterForm = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { handleSubmit, handleInputChange } = useRegister()

  return (
    <ChakraProvider>
      <Center height="100vh">
        <Box p={4} borderRadius="xl" boxShadow="md" width={{ base: "100%", md: "30%" }}>
          <form onSubmit={handleSubmit}>
            <Text fontSize={"5xl"} color={"green"} fontWeight="semibold">
              circle
            </Text>
            <Text fontSize={"4xl"} mb={4} fontWeight={"medium"}>
              Create account circle
            </Text>
            <Stack spacing={4}>
              <FormControl isRequired>
                <Input
                  py={7}
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <Input
                  py={7}
                  type="text"
                  placeholder="Usernme"
                  name="username"
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <Input
                  py={7}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                />
              </FormControl>

              <InputGroup size="md">
                <Input
                  py={6}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleInputChange}
                />
                <InputRightElement width="5rem">
                  <Button mt={2} ml={7} bg={"transparent"} onClick={handleClick}>
                    {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                py={6}
                fontSize={"xl"}
                rounded={"full"}
                type="submit"
                bg="green"
                _hover={{ bg: "green.500" }}
                transitionDuration={"300ms"}
                width="100%"
              >
                Create
              </Button>
              <Text>
                Already have an account ?{" "}
                <Link
                  to={"/login"}
                  className="cursor-pointer text-green-600 hover:underline duration-300 transition"
                >
                  Login
                </Link>{" "}
              </Text>
            </Stack>
          </form>
        </Box>
      </Center>
    </ChakraProvider>
  )
}

export default RegisterForm
