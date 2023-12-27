import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { RiImageAddLine } from "react-icons/ri"
import useInputThread from "../hooks/useInputThread"

const ModalPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  const { text, handleTextChange, handleImageChange, handlePostClick } = useInputThread()

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
          <form>
            <Box display={"flex"} gap={5} justifyContent={"space-between"}>
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                className="w-[45px]"
              />

              <div className="relative w-full">
                <Input
                  placeholder="What is happening ?"
                  variant="flushed"
                  value={text}
                  onChange={handleTextChange}
                  className="w-full px-2 py-2 rounded-md bg-transparent"
                />
              </div>
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} mt={5}>
              <div>
                <label
                  htmlFor="imageInput"
                  className="relative cursor-pointer text-green-500"
                >
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <RiImageAddLine size={30} />
                </label>
              </div>

              <Button
                onClick={handlePostClick}
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
