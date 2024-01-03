export interface Thread {
  profile_picture: string
  content: string
  image: string
  id: number

  user: {
    fullname: string
    id: number
    username: string
    email: string
  }
}

export interface DetailThread {
  user: {
    username: string
    fullname: string
    profile_picture: string
  }
  content: string
  id: number
  email: string
  image: string
  like: number
  chat: number
}

export interface InputThreadProps {
  placeholderText: string
  buttonText: string
}

export interface Profile {
  fullname: string
  username: string
  email: string
  profile_picture: string
  profile_description: string
}

export interface Ireplies {}
