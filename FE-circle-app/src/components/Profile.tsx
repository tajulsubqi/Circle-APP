import { Avatar, Box, Button, Card, CardBody, Image, Stack } from "@chakra-ui/react"
import Footer from "./Footer"
import Suggested from "./Suggested"
import { useEffect, useState } from "react"
import Api from "../lib/api"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth)

  const [datas, setDatas] = useState({}) // Ubah dari array menjadi objek

  const fetchData = async () => {
    try {
      const response = await Api.get(`/users/${user.id}`)
      setDatas(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])
  
  return (
    <>
      <div className=" p-4 right-0">
        <Card>
          <CardBody className="p-4 rounded-lg shadow-lg">
            <h2 className="mb-3 font-medium">My Profile</h2>
            <Image
              src="../public/bg.jpg"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              className="w-full h-32 "
            />

            <Avatar
              size={"lg"}
              bg="teal.500"
              className="border-[3px] -top-10 left-4 absolute"
            />

            <div className="-mt-14">
              <Box display={"flex"} justifyContent={"end"}>
                <Button colorScheme="teal" variant="outline" size="sm" rounded="full">
                  Edit Profile
                </Button>
              </Box>

              <Stack mt="6" spacing="3">
                <h3 className="text-xl font-bold -mt-8">{datas?.fullname}</h3>
                <p className="text-slate-400 -mt-2">@{datas?.username}</p>
                <p className="-mt-3">{datas?.profile_description}</p>
                <div className="flex gap-5 -mt-1">
                  <p>
                    291 <span className="text-slate-400 text-[13px]">Following</span>
                  </p>
                  <p>
                    23 <span className="text-slate-400 text-[13px]">Followers</span>
                  </p>
                </div>
              </Stack>
            </div>
          </CardBody>
        </Card>

        <Suggested />
        <Footer />
      </div>
    </>
  )
}

export default Profile
