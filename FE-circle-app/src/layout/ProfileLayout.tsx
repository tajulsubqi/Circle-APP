import Profile from "../components/RightSidebar/Profile"
import ProfileDetail from "../components/LeftSidebar/ProfileDetail"
import SideBar from "../components/LeftSidebar/SideBar"

const ProfileLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <ProfileDetail />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default ProfileLayout
