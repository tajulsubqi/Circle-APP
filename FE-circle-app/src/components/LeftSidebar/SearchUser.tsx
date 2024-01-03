import { Box, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { IoSearch } from "react-icons/io5"
import ListUser from "../home/ListUser"
import { useState } from "react"

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <Box className="border-x border-slate-400 mt-4 p-4">
      <Text className="font-semibold">Cari</Text>
      <Box display={"flex"}>
        <InputGroup mt={7} display={"flex"} justifyContent={"center"}>
          <InputRightElement pointerEvents="none" width="29%">
            <IoSearch size={20} />
          </InputRightElement>
          <Input
            type="tel"
            placeholder="Cari ..."
            p={5}
            width={"80%"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Box>

      <Box>
        <ListUser searchQuery={searchQuery} />
      </Box>
    </Box>
  )
}

export default SearchUser
