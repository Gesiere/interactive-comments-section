import { ReactElement } from "react"

export type Comments = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: User,
    replies: Replies []
}

export type Replies = {
  id: number
  content: string
  createdAt: string
  score: number
  user: User,
  replyingTo: string
}


export type CurrentUser = {
    image:{
        png: string,
        webp: string
    },
    username: string
}

export enum REDUCER_ACTION {
  HANDLE_REPLY,
  ADD_REPLY,
  ADD_COMMENT,
  
}

export type CommentsStateType = {
    comments:Comments[],
    currentUser: CurrentUser,
    isReply: any
}

export type User = {
  
    image: {
      png: string
      webp: string
    }
    username: string
  
}


export type ChildrenType = { children?: ReactElement | ReactElement[] }
