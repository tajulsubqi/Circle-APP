import SideBar from "../components/LeftSidebar/SideBar"
import Profile from "../components/RightSidebar/Profile"
import Follows from "../components/home/Follows"

const FollowLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <Follows />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default FollowLayout
