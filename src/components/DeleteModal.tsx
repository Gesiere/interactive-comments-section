import { useGlobalCommentsContext } from "../commetsHooks/CommentsProvider"


interface PropType {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
  id: number
}

const DeleteModal = ({setDeleting, id}:PropType) => {
    const {dispatch, reducerAction} = useGlobalCommentsContext()
    
    const handleDelete = () => {
        dispatch({type: reducerAction.DELETE_COMMENT, payload:{id}})
        setDeleting(false)
    }

  return (
    <div className="animate-fadeIn fixed flex h-[100vh] w-full items-center justify-center inset-0 bg-black/[.3]">
      <div className="bg-white rounded-md p-6  max-w-[90%] sm:max-w-[45%] md:max-w-[35%] xl:max-w-[26%]">
        <h1 className="text-grayishBlue text-xl font-bold mb-4">Delete Comment</h1>
        <p className="text-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className="flex mt-4 justify-between items-center">
          <button 
          onClick={() => setDeleting(false)}
          className="bg-grayishBlue font-bold uppercase py-[15px] px-[20px] rounded-lg text-white text-[15px]">
            No, Cancel
          </button>
          <button
          onClick={() => handleDelete()}
           className="bg-softRed font-bold py-[15px] uppercase px-[20px] rounded-lg text-white text-[15px]">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal