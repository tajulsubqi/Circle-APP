import SideBar from "../components/LeftSidebar/SideBar"
import Profile from "../components/RightSidebar/Profile"
import ThreadDetail from "../components/home/Threads/ThreadDetail"

const HomeLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <ThreadDetail />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default HomeLayout
