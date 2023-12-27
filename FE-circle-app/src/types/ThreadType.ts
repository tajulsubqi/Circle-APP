export interface Thread {
  id: number
  fullname: string
  email: string
  content: string
  image: string
  like: number
  chat: string
}

export interface DetailThread {
  fullname: "string"
  email: "string"
  content: "string"
  createdAt: "string"
  like: number
  comment: "string"
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
