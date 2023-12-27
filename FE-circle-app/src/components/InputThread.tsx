import { Avatar, Box, Button, FormLabel, Input } from "@chakra-ui/react"
import { RiImageAddLine } from "react-icons/ri"
import { InputThreadProps } from "../types/ThreadType"
import useInputThread from "../hooks/useInputThread"

const InputThread = ({ placeholderText, buttonText }: InputThreadProps) => {
  const { inputThreads, handleChange, handlePostClick } = useInputThread()

  return (
    <div>
      <form
        onSubmit={handlePostClick}
        encType="multipart/form-data"
        className="container flex items-center gap-3 my-5"
      >
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          className="w-[45px]"
        />

        <div className="relative w-full">
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

export default InputThread
