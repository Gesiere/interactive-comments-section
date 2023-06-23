import { useState } from "react"
import { useGlobalCommentsContext } from "../commetsHooks/CommentsProvider"
import {  REDUCER_ACTION } from "../models/model"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
type PropType = {
  replyingTo?: string
  buttonLabel: string
  type: REDUCER_ACTION
  parentId?: number
  setIsReply?: React.Dispatch<React.SetStateAction<boolean>>
}


const Reply = ({setIsReply, type, buttonLabel, replyingTo, parentId}: PropType) => {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo("en-US");
    const {state, dispatch, reducerAction} = useGlobalCommentsContext()
    const replyingToUser = replyingTo ? `@${replyingTo}`: ''
    const currentUser = state.currentUser

    const [comment, setComment] = useState(replyingToUser)
    

    

    const handleSubmit = () => {
      if(comment === "") return
        
      if(type === reducerAction.ADD_COMMENT){
          const newComment = {
            id: performance.now(),
            content: comment,
            createdAt: timeAgo.format(new Date()),
            score: 0,
            user: currentUser,
            replies: [],
          }
          
          dispatch({type: type, payload: newComment})

      }
      if(type === reducerAction.ADD_REPLY){
        const data = {
          id: performance.now(),
          content: comment.replace(replyingToUser, ''),
          createdAt: timeAgo.format(new Date()),
          score: 0,
          user: currentUser,
          replyingTo: replyingTo,
        }
        const payload ={
          data,
          parentId
        }

        
        dispatch({type: type, payload: payload})
        setIsReply!(false)
      }
      setComment('')
  
      
      

     
    }
  return (
    <div className="bg-white ease-in duration-1000 max-[768px]:items-center rounded-md my-4 p-4 grid max-[768px]:grid-rows-[auto] grid-cols-[auto_1fr_auto] gap-4">
      <img
        className="w-[2rem]"
        src={`${currentUser.image.png}`}
        alt="A User Profile Picture"
      />
      <textarea
        rows={3}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="focus:outline-none focus:border-moderateBlue p-4 rounded-md border-solid border-2 border-grayBlue "
        name="reply"
        id="reply"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="hover:opacity-25 duration-400 ease-in-out send-btn md:h-[3rem] rounded-md bg-moderateBlue text-white py-2 px-8"
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default Reply