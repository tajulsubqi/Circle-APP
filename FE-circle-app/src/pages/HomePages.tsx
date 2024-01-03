// import { useState } from "react"
import Profile from "../components/RightSidebar/Profile"
import SideBar from "../components/LeftSidebar/SideBar"
import { ThreadItem } from "../components/home/Threads/ThreadItem"

const Home = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <ThreadItem />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default Home
