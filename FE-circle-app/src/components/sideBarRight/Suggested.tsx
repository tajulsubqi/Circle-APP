import { Avatar, Button, Card, CardBody } from "@chakra-ui/react"
import useSuggested from "../../hooks/useSuggested"

const Suggested = () => {
  const { suggestedUsers } = useSuggested()

  return (
    <div className="mt-4">
      <Card>
        <CardBody className="p-4 rounded-lg">
          <h2 className="text-lg  mb-3 font-medium">Suggested for you</h2>

          {suggestedUsers.map((user) => (
            <div key={user.id}>
              <div className="flex gap-4 mt-6">
                <Avatar bg="teal.500" className="w-[40px] h-[40px]" />
                <div className="flex flex-col text-sm">
                  <div className="w-[350px] flex justify-between">
                    <p className="">
                      {user.fullname}{" "}
                      <span className="text-slate-400 block">@{user.username}</span>
                    </p>
                    <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                      Following
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}

export default Suggested
