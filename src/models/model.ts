import { ReactElement } from "react"

export interface Comments{
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: User,
    replies: Replies []
}

export interface Replies extends Comments{
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
  UPVOTE,
  DOWNVOTE,
  UPDATE,
  DELETE_COMMENT
  
}

export type CommentsStateType = {
    comments:Comments[],
    currentUser: CurrentUser,
   
}

export type User = {
  
    image: {
      png: string
      webp: string
    }
    username: string
  
}


export type ChildrenType = { children?: ReactElement | ReactElement[] }
