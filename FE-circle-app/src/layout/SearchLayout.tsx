import SideBar from "../components/LeftSidebar/SideBar"
import Profile from "../components/RightSidebar/Profile"
import Search from "../components/LeftSidebar/SearchUser"

const Searchlayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <Search />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default Searchlayout
