import SideBar from "../components/SideBar"
import Profile from "../components/Profile"
import ThreadDetail from "../components/ThreadDetail"

const ThreadLayout = () => {
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

export default ThreadLayout
