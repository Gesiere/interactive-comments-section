import { ChildrenType, CommentsStateType, REDUCER_ACTION, } from "../models/model"
import data from '../../data.json'
import { createContext, useContext, useReducer, useMemo, useEffect } from "react"
import { reducer } from "./ReducerAction"



const initState:CommentsStateType = {
    comments:  data.comments,
    currentUser: data.currentUser,
}

const initializer = (initialValue = initState) => {
  const localData = localStorage.getItem('comments')
  if (localData) {
    return JSON.parse(localData)
  } else {
    return initialValue
  }
}



const useCommentsContext = () => {
    const [state,dispatch] = useReducer(reducer, initializer())

     useEffect(() => {
       localStorage.setItem('comments', JSON.stringify(state))
     }, [state])
    
    const reducerAction = useMemo(() => {
      return REDUCER_ACTION
    }, [])

    const updateComments = (id: number, content: string) => {
        dispatch({type: reducerAction.UPDATE, payload:{id, content}})
    }



    return {
        state, reducerAction,dispatch, updateComments
    }
}

type UseCommentsContextType = ReturnType<typeof useCommentsContext>

const initCommentContextState: UseCommentsContextType = {
  state: initState,
  reducerAction: REDUCER_ACTION,
  dispatch: () => {},
  updateComments: () => {}
  

}

const CommentsContext = createContext<UseCommentsContextType>(initCommentContextState)

export const AppProvider = ({children} : ChildrenType) => {
    return (
        <CommentsContext.Provider value={useCommentsContext()}>
            {children}
        </CommentsContext.Provider>
    )

}

export const useGlobalCommentsContext = () => {
    const context = useContext(CommentsContext)
    return context
}