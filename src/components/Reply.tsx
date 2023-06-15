import { useState } from "react"
import { useGlobalCommentsContext } from "../commetsHooks/CommentsProvider"
import { Comments, REDUCER_ACTION, Replies } from "../models/model"

type PropType ={
  replyingTo?: string,
  buttonLabel: string,
  type: REDUCER_ACTION,
  parentId?: number,
  addNewComment?: (newReply: Replies | Comments) => void
}


const Reply = ({ type, buttonLabel, replyingTo, parentId}: PropType) => {
    const {state, dispatch, reducerAction} = useGlobalCommentsContext()
    const currentUser = state.currentUser

    const [comment, setComment] = useState('')

    const handleSubmit = () => {
      if(comment === "") return
   
        
      if(type === reducerAction.ADD_COMMENT){
          const newComment = {
            id: performance.now(),
            content: comment,
            createdAt: `${new Date()}`,
            score: 0,
            user: currentUser,
            replies: [],
          }
          dispatch({type: type, payload: newComment})

      }
      if(type === reducerAction.ADD_REPLY){
        const data = {
          id: performance.now(),
          content: comment,
          createdAt: `${new Date().getTime()}`,
          score: 0,
          user: currentUser,
          replyingTo: replyingTo,
        }
        const payload ={
          data,
          parentId
        }
        
        dispatch({type: type, payload: payload})
      }
      setComment('')
      state.isReply = null
      
      

     
    }
  return (
    <div className="bg-white max-[768px]:items-center rounded-md m-4 p-4 grid max-[768px]:grid-rows-[auto] grid-cols-[auto_1fr_auto] gap-4">
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
        className="p-4 rounded-md border-solid border-2 border-grayBlue "
        name="reply"
        id="reply"
      ></textarea>
      <button 
      onClick={handleSubmit}
      className="send-btn md:h-[3rem] rounded-md bg-moderateBlue text-white py-2 px-8">
        {buttonLabel}
      </button>
    </div>
  )
}

export default Reply