import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { RiImageAddLine } from "react-icons/ri"
import { jwtDecode } from "jwt-decode"
import useInputThread from "../home/Threads/hook/useFormThread"

const ModalPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  const { inputThreads, handleChange, handlePostClick } = useInputThread()

  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{
    profile_picture: string
    fullname: string
    id: number
  }>(token)

  // console.log(user)

  return (
    <>
      <Button
        bg={"green"}
        rounded={"full"}
        width={"100%"}
        _hover={{ bg: "green.500" }}
        transitionDuration={"300ms"}
        onClick={onOpen}
      >
        Create Post
      </Button>
      <Modal size={"2xl"} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalCloseButton />
          <form onSubmit={handlePostClick}>
            <Box display={"flex"} gap={5} justifyContent={"space-between"}>
              <Avatar
                name={user.fullname}
                src={user.profile_picture}
                className="w-[45px]"
              />

              <div className="relative w-full">
                <Input
                  placeholder="What is happening ?"
                  variant="flushed"
                  name="content"
                  value={inputThreads.content}
                  onChange={handleChange}
                  className="w-full px-2 py-2 rounded-md bg-transparent"
                />
              </div>
            </Box>

            {/* {imagePreview && (
                <Box m={5}>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    boxSize="40%"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>
              )} */}
            <Box display={"flex"} justifyContent={"space-between"} mt={5}>
              <div>
                <label
                  htmlFor="imageInput"
                  className="relative cursor-pointer text-green-500"
                >
                  <input
                    type="file"
                    id="imageInput"
                    name="image"
                    className="hidden"
                    onChange={handleChange}
                  />

                  <RiImageAddLine size={30} />
                </label>
              </div>

              <Button
                bg={"green"}
                _hover={{ bg: "green.500" }}
                size="sm"
                px={7}
                rounded={"full"}
              >
                reply
              </Button>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalPost
