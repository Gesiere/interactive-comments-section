import { REDUCER_ACTION, CommentsStateType, Comments} from "../models/model";




type ReducerAction = | { 
    type: REDUCER_ACTION.ADD_COMMENT
    payload: Comments
} | {
    type:REDUCER_ACTION.ADD_REPLY,
    payload: any
    
} | {
    type: REDUCER_ACTION.HANDLE_REPLY,
    payload: any
    
} | {
    type: REDUCER_ACTION.UPVOTE,
    payload: {
        id: number
    }
} | {
    type: REDUCER_ACTION.DOWNVOTE,
    payload: {
        id: number,
        score: number
    }
} | {
    type: REDUCER_ACTION.UPDATE,
    payload: {
        id: number,
        content: string
    }
} | {
    type: REDUCER_ACTION.DELETE_COMMENT,
    payload: {
        id: number
    }
}



export const reducer = (state: CommentsStateType, action: ReducerAction) => {
    switch(action.type){
        case REDUCER_ACTION.ADD_COMMENT:{
            return {...state, comments: [...state.comments, action.payload]}
        }
        case REDUCER_ACTION.ADD_REPLY: {
            const newState =  {...state}
                newState.comments[action.payload.parentId - 1].replies.push(
                        action.payload.data
                )
             
                
             
                
            return newState
            
        }
        case REDUCER_ACTION.UPVOTE: {
            const {id} = action.payload

              const currentComments = state.comments.map((c) => {
                c.replies = c.replies.map((reply) => {
                  if (reply.id === id) reply.score = reply.score + 1
                  reply.replies = reply.replies.map((r) => {
                    if (r.id === id) r.score = reply.score + 1
                    return r
                  })
                  return reply
                })
                if (c.id === id) c.score = c.score + 1
                return c
              })
            return {...state, comments: currentComments}
        }
        case REDUCER_ACTION.DOWNVOTE: {
             const {id,score} = action.payload
             let currentScore = score
             
             if(currentScore < 1) return state
             
              const currentComments = state.comments.map((c) => {
                c.replies = c.replies.map((reply) => {
                  if (reply.id === id) reply.score = currentScore - 1
                  reply.replies = reply.replies.map((r) => {
                    if (r.id === id) r.score = currentScore - 1
                    return r
                  })
                  return reply
                })
                if (c.id === id) c.score = currentScore - 1
                return c
            })
            return {...state, comments: currentComments}
        }
        case REDUCER_ACTION.UPDATE: {
            const {id, content} = action.payload
   
            

            const updatedComments = state.comments.map((c) => {
  
                
              c.replies = c.replies.map((reply) => {
                if (reply.id === id) reply.content = content
          
                return reply
              })
              if (c.id === id) c.content = content

              return c
            })
            return { ...state, comments: updatedComments }
        }
        case REDUCER_ACTION.DELETE_COMMENT: {
            const {id} = action.payload
            const updateComments = state.comments.filter((comments) => {
                comments.replies = comments.replies.filter((reply) => {
                    if(reply.id === id ) reply.id !== id
                    return reply.id !== id
                }) 

            return comments.id !== id
          
            }) 

            return {...state, comments: updateComments}
        }
        default: 
        return state
    }
}
