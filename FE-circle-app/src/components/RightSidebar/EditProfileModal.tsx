import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Input,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"
// import { FaRegImage } from "react-icons/fa6"
import { RiImageAddLine } from "react-icons/ri"
import Api from "../../lib/api"

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    profile_description: "",
    profile_picture: null,
    background: null,
  })

  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("fullname", formData.fullname)
      formDataToSend.append("username", formData.username)
      formDataToSend.append("profile_description", formData.profile_description)
      formDataToSend.append("profile_picture", formData.profile_picture as File)
      formDataToSend.append("background", formData.background as File)

      const response = await Api.post("/users", formDataToSend)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        variant={"outline"}
        colorScheme="whatsapp"
        rounded={"full"}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <Stack spacing={4}>
                <Input
                  type="text"
                  name="fullname"
                  variant="outline"
                  placeholder="Fullname"
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  name="username"
                  variant="outline"
                  placeholder="Username"
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  name="profile_description"
                  variant="outline"
                  placeholder="Bio"
                  onChange={handleInputChange}
                />

                <Box mt={2}>
                  <Text fontSize={"sm"}>Change Photo Profile </Text>
                  <FormLabel
                    color={"green"}
                    _hover={{ color: "green.500" }}
                    cursor={"pointer"}
                  >
                    <Input
                      type="file"
                      id="imageInput"
                      name="profile_picture"
                      onChange={handleFileChange}
                      // hidden
                    />
                    <RiImageAddLine size={30} />
                  </FormLabel>
                </Box>

                <Box>
                  <Text fontSize={"sm"}>Change background </Text>
                  <FormLabel
                    id="imageInput"
                    color={"green"}
                    _hover={{ color: "green.500" }}
                    cursor={"pointer"}
                  >
                    <Input
                      type="file"
                      id="imageInput"
                      name="background"
                      onChange={handleFileChange}
                      // style={{ display: "none" }}
                    />
                    <RiImageAddLine size={30} />
                  </FormLabel>
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                w={"100%"}
                bg={"green"}
                color={"white"}
                rounded={"xl"}
                transitionDuration={"300ms"}
                _hover={{ bg: "green.500" }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default EditProfileModal
