import { createSlice } from "@reduxjs/toolkit"

interface Auth {
  id: number
  fullname: string
  username: string
  email: string
  profile_picture: string
  profile_description: string
}

const initialState: Auth = {
  id: 0,
  fullname: "",
  username: "",
  email: "",
  profile_picture: "",
  profile_description: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGIN_SUCCESS: (_, action) => {
      localStorage.setItem("token", action.payload)
    },
    USER_LOGIN: (state, action) => {
      state.id = action.payload.userId
      state.fullname = action.payload.fullname
      state.username = action.payload.username
      state.email = action.payload.email
      state.profile_picture = action.payload.profile_picture
      state.profile_description = action.payload.profile_description
    },
    USER_LOGOUT: () => {
      localStorage.removeItem("token")
    },
  },
})

export const { LOGIN_SUCCESS, USER_LOGIN, USER_LOGOUT } = authSlice.actions
export default authSlice.reducer
