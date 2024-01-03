import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Auth {
  id: number
  fullname: string
  username: string
  email: string
  profile_picture: string
  profile_description: string
  isAuthenticated: boolean
}

const initialState: Auth = {
  id: 0,
  fullname: "",
  username: "",
  email: "",
  profile_picture: "",
  profile_description: "",
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGIN_SUCCESS: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload)
      state.isAuthenticated = true
    },
    USER_LOGIN: (state, action) => {
      state.id = action.payload.userId
      state.fullname = action.payload.fullname
      state.username = action.payload.username
      state.email = action.payload.email
      state.profile_picture = action.payload.profile_picture
      state.profile_description = action.payload.profile_description
      state.isAuthenticated = true
    },
    USER_LOGOUT: (state) => {
      localStorage.removeItem("token")
      state.isAuthenticated = false
    },
  },
})

export const { LOGIN_SUCCESS, USER_LOGIN, USER_LOGOUT } = authSlice.actions
export default authSlice.reducer
