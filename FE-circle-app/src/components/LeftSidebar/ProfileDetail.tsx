import { Avatar, Box, Image, Stack } from "@chakra-ui/react"
import { jwtDecode } from "jwt-decode"
import EditProfileModal from "../RightSidebar/EditProfileModal"

const ProfileDetail = () => {
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{
    fullname: string
    username: string
    profile_picture: string
    profile_description: string
    email: string
    id: number
  }>(token)

  return (
    <>
      <Box mt={4}>
        <Box className="p-4 rounded-lg shadow-lg">
          <h2 className="mb-3 font-medium">My Profile</h2>
          <Image
            src="../public/bg.jpg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            className="w-full h-32"
          />
          <Avatar
            size={"2xl"}
            src={user.profile_picture}
            className="border-[3px] -top-10 left-4 absolute"
          />
          <>
            <div className="-mt-14">
              {/* <Box display={"flex"} justifyContent={"end"}>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    size="sm"
                    rounded="full"
                    // onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </Box> */}

              <Box display={"flex"} justifyContent={"end"}>
                <EditProfileModal />
              </Box>

              <Stack mt="6" spacing="3">
                <h3 className="text-xl font-bold -mt-8">{user.fullname}</h3>
                <p className="text-slate-400 text-sm -mt-3 mb-3">@{user.username}</p>
                <p className="-mt-3">{user.profile_description}</p>
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
          </>
        </Box>
      </Box>
    </>
  )
}

export default ProfileDetail
