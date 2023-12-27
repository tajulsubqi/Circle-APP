// import { useState } from "react"
import { ListThread } from "../components/ListThread"
import Profile from "../components/Profile"
import SideBar from "../components/SideBar"

const Home = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <div className="w-[20rem]">
          <SideBar />
        </div>

        <div className="w-1/2">
          <ListThread />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  )
}

export default Home
