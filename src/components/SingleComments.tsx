
import { useGlobalCommentsContext } from '../commetsHooks/CommentsProvider'
import { Comments, Replies, User } from '../models/model'
import Reply from './Reply'

type propType = {
  comments: Comments | Replies,
  parentId: number
}

const SingleComments = ({comments, parentId} : propType) => {
    const {user, createdAt, content,score, id} = comments
    const {state, reducerAction, handleReply} = useGlobalCommentsContext()
    const isReply = state.isReply

    



  
    const getCurrentUser = (user: User): JSX.Element => {
      if (user.username === state.currentUser.username) {
        return (
          <div className="flex gap-4">
            <button className="text-softRed font-[500] flex items-center ">
              <img
                className="mr-2"
                src="../images/icon-delete.svg"
                alt="A Delete Icon"
              />
              Delete
            </button>
            <button className="flex  font-[500] text-moderateBlue items-center">
              <img
                className="mr-2"
                src="../images/icon-edit.svg"
                alt="A Edit Icon"
              />
              Edit
            </button>
          </div>
        )
      } else {
        return <div className="">
            <button onClick={() => handleReply(id)} className='text-moderateBlue font-bold flex items-center justify-center'>
                <img className='mr-2' src="../images/icon-reply.svg" alt="A Reply Icon" />
                Reply
            </button>
        </div>
      }
    }
  
  return (
    <>
      <article className="bg-white mb-4 shadow rounded-md p-4 md:flex items-center gap-4">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="w-[2rem]"
                src={`${user.image.png}`}
                alt={`The profile picture of ${user.username}`}
              />
              <span className="text-darkBlue font-bold">{user.username}</span>
              <span className="text-grayishBlue">{createdAt}</span>
            </div>
            <div className="max-[991px]:hidden">{getCurrentUser(user)}</div>
          </div>
          <p className="my-4 text-grayishBlue">
        
            {content}
          </p>
        </div>
        <div className="md:order-first flex items-center justify-between">
          <div className="bg-veryLightGray gap-4 justify-center w-[40%] md:w-full md:flex-col rounded-md flex items-center p-2 md:p-4">
            <button>
              <img src="./images/icon-plus.svg" alt="A plus icon" />
            </button>
            <span className="text-moderateBlue font-[500]">{score}</span>
            <button>
              <img src="./images/icon-minus.svg" alt="A minus icon" />
            </button>
          </div>
          <div className="md:hidden">{getCurrentUser(user)}</div>
        </div>
      </article>
      {isReply === id && (
        <Reply
        // addNewComment={addReply}
          buttonLabel="Reply"
          type={reducerAction.ADD_REPLY}
          replyingTo={user.username}
          parentId={parentId}
        />
      )}
    </>
  )
}

export default SingleComments