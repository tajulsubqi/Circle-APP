import { Avatar, Box, Button, FormLabel, Image, Input } from "@chakra-ui/react"
import { RiImageAddLine } from "react-icons/ri"
import { InputThreadProps } from "../../../types"
import { jwtDecode } from "jwt-decode"
import useInputThread from "./hook/useFormThread"

const FormThread = ({ placeholderText, buttonText }: InputThreadProps) => {
  const { inputThreads, handleChange, handlePostClick, imagePreview } = useInputThread()

  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{
    profile_picture: string
    fullname: string
    id: number
  }>(token)

  return (
    <div>
      <form
        onSubmit={handlePostClick}
        encType="multipart/form-data"
        className="container flex items-center gap-3 my-5"
      >
        <Avatar name={user.fullname} src={user.profile_picture} className="w-[45px]" />

        <div className="relative w-full">
          {imagePreview && (
            <Box m={5}>
              <Image
                src={imagePreview}
                alt="Preview"
                boxSize="40%"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>
          )}
          <Input
            placeholder={placeholderText}
            variant="flushed"
            value={inputThreads.content}
            name="content"
            onChange={handleChange}
            className="w-full px-2 py-2 rounded-md bg-transparent"
          />
        </div>

        <Box mt={2}>
          <FormLabel color={"green"} _hover={{ color: "green.500" }} cursor={"pointer"}>
            <Input
              type="file"
              id="imageInput"
              name="image"
              onChange={handleChange}
              hidden
            />

            <RiImageAddLine size={30} />
          </FormLabel>
        </Box>

        <Button
          type="submit"
          bg={"green"}
          _hover={{ bg: "green.500" }}
          transitionDuration={"300ms"}
          size="sm"
          px={7}
          rounded={"full"}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

export default FormThread
