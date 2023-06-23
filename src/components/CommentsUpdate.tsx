import { useState } from "react"
import { useGlobalCommentsContext } from "../commetsHooks/CommentsProvider"

type PropType = {
  id: number
  content: string
  replyingTo: string | undefined
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentsUpdate = ({id, content,setEdit}:PropType) => {
    const {updateComments} = useGlobalCommentsContext()
    
    const [isContent, setIsContent] = useState(content)
    

    const handleUpdate = () => {
        updateComments(id, isContent)
        setEdit(false)
    }
  return (
    <div className="">
      <textarea
        cols={30}
        className="h-[100px] my-2 py-2 px-6 border-2 border-moderateBlue border-solid rounded-md w-full"
        value={isContent}
        onChange={(e) => setIsContent(e.target.value)}
      ></textarea>
      <button
        onClick={() => handleUpdate()}
        className="hover:opacity-25 duration-400 ease-in-out float-right bg-moderateBlue text-white rounded-md px-6 py-2"
      >
        UPDATE
      </button>
    </div>
  )
}

export default CommentsUpdate