import { Avatar, Button, Card, CardBody } from "@chakra-ui/react"

const Suggested = () => {
  return (
    <div className="mt-4">
      <Card>
        <CardBody className="p-4 rounded-lg">
          <h2 className="text-lg  mb-3 font-medium">Suggested for you</h2>

          <div>
            <div className="flex gap-4 mt-6">
              <Avatar bg="teal.500" className="w-[40px] h-[40px]" />
              <div className="flex flex-col text-sm">
                <div className="w-[350px] flex justify-between">
                  <p className="">
                    Muhammad Jawahir{" "}
                    <span className="text-slate-400 block">@em.jawahir</span>
                  </p>
                  <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                    Following
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-4 mt-6">
              <Avatar bg="teal.500" className="w-[40px] h-[40px]" />
              <div className="flex flex-col text-sm">
                <div className="w-[350px] flex justify-between">
                  <p className="">
                    Muhammad Jawahir{" "}
                    <span className="text-slate-400 block">@em.jawahir</span>
                  </p>
                  <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                    Following
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-4 mt-6">
              <Avatar bg="teal.500" className="w-[40px] h-[40px]" />
              <div className="flex flex-col text-sm">
                <div className="w-[350px] flex justify-between">
                  <p className="">
                    Muhammad Jawahir{" "}
                    <span className="text-slate-400 block">@em.jawahir</span>
                  </p>
                  <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                    Following
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Suggested
