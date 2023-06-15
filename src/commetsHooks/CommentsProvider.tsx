import { ChildrenType, CommentsStateType, REDUCER_ACTION, } from "../models/model"
import data from '../../data.json'
import { createContext, useContext, useReducer, useMemo } from "react"
import { reducer } from "./ReducerAction"



const initState:CommentsStateType = {
    comments:  data.comments,
    currentUser: data.currentUser,
    isReply: false
}


const useCommentsContext = (initState : CommentsStateType) => {
    const [state,dispatch] = useReducer(reducer, initState)
    
    const reducerAction = useMemo(() => {
      return REDUCER_ACTION
    }, [])

    const handleReply = (isReply: any) => {
        dispatch({type:reducerAction.HANDLE_REPLY, payload: isReply})
    }

    return {
        state, reducerAction,dispatch, handleReply
    }
}

type UseCommentsContextType = ReturnType<typeof useCommentsContext>

const initCommentContextState: UseCommentsContextType = {
  state: initState,
  reducerAction: REDUCER_ACTION,
  dispatch: () => {},
  handleReply: () => {}

}

const CommentsContext = createContext<UseCommentsContextType>(initCommentContextState)

export const AppProvider = ({children} : ChildrenType) => {
    return (
        <CommentsContext.Provider value={useCommentsContext(initState)}>
            {children}
        </CommentsContext.Provider>
    )

}

export const useGlobalCommentsContext = () => {
    const context = useContext(CommentsContext)
    return context
}