import { Avatar, Box, Button, FormLabel, Input } from "@chakra-ui/react"
import { RiImageAddLine } from "react-icons/ri"
import { jwtDecode } from "jwt-decode"
import useFormReplies from "./hook/useFormReplies"

const FormReplies = () => {
  const { inputReplies, handleChange, handlePostClick } = useFormReplies()

  const token = localStorage.getItem("token") + ""
  const parsedUser = jwtDecode<{
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
        <Avatar
          name={parsedUser.fullname}
          src={parsedUser.profile_picture}
          className="w-[45px]"
        />

        <div className="relative w-full">
          <Input
            placeholder="Write a reply"
            variant="flushed"
            value={inputReplies.content}
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
          Reply
        </Button>
      </form>
    </div>
  )
}

export default FormReplies
