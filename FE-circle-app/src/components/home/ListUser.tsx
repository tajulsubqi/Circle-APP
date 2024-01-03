import { Avatar, Box, Button } from "@chakra-ui/react"
import useSuggested from "../../hooks/useSuggested"

const ListUser = ({ searchQuery }: { searchQuery: string }) => {
  const { suggestedUsers } = useSuggested()

  const filteredUsers = suggestedUsers.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Box p={10}>
        {filteredUsers.map((user) => (
          <Box
            key={user.id}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <div className="flex gap-4 mt-6">
              <Avatar bg="teal.500" className="w-[40px] h-[40px]" />

              <div className="flex flex-col text-sm">
                <div className="w-full flex justify-between">
                  <p className="">
                    {user.fullname}{" "}
                    <span className="text-slate-400 block">@{user.username}</span>
                  </p>
                </div>
              </div>
            </div>
            <Box mt={4}>
              <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                Following
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ListUser
