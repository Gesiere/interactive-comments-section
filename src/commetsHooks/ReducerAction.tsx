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
    
}

export const reducer = (state: CommentsStateType, action: ReducerAction) => {
    switch(action.type){
        case REDUCER_ACTION.ADD_COMMENT:{
            return {...state, comments: [...state.comments, action.payload]}
        }
        case REDUCER_ACTION.ADD_REPLY: {
            const newState =  {...state}
         
            
            const parentIndex = newState.comments.findIndex(
              (comment) =>
                comment.id === action.payload.parentId ||
                comment.replies.some((reply) => reply.id === parentIndex)
            )
            console.log(newState.comments[parentIndex]);

                newState.comments[parentIndex].replies.push(
                        action.payload.data
                )

                

                // console.log(newState.comments[parentIndex].replies);
                

            
            return newState
            
        }
        case REDUCER_ACTION.HANDLE_REPLY:{
            return {...state, isReply: action.payload}
        }
        default: 
        return state
    }
}
