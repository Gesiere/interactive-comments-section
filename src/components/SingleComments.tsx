

import { useState } from 'react'
import { useGlobalCommentsContext } from '../commetsHooks/CommentsProvider'
import { Comments, User } from '../models/model';
import CommentsUpdate from './CommentsUpdate';
import CommentsUpvotes from './CommentsUpvotes';
import DeleteModal from './DeleteModal';
import Reply from './Reply'
interface CommentProps extends Comments {
  replyingTo?: string,
  parentId: number
}

const SingleComments = ({user, createdAt, content, score, id, parentId,replyingTo }:CommentProps) => {
   

    const {state, reducerAction} = useGlobalCommentsContext()
    const [isReply, setIsReply] = useState(false)
    const [isEditing, setEditing] = useState(false)
      const [isDeleting, setDeleting] = useState(false)




    



  
    const getCurrentUser = (user: User): JSX.Element => {
      if (user.username === state.currentUser.username) {
        return (
          <div className="flex gap-4">
            <button
              onClick={() => setDeleting(!isDeleting)}
              className="hover:opacity-25 duration-400 ease-in-out text-softRed font-[500] flex items-center "
            >
              <img
                className="mr-2"
                src="../images/icon-delete.svg"
                alt="A Delete Icon"
              />
              Delete
            </button>
            <button
              onClick={() => setEditing(true)}
              className=" hover:opacity-25 duration-400 ease-in-out flex  font-[500] text-moderateBlue items-center"
            >
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
            <button 
            onClick={() => setIsReply(!isReply)} 
            className='text-moderateBlue hover:opacity-25 duration-400 ease-in-out font-bold flex items-center justify-center'>
                <img className='mr-2' src="../images/icon-reply.svg" alt="A Reply Icon" />
                Reply
            </button>
        </div>
      }
    }
  
  return (
    <>
      <article className="bg-white mb-4 shadow rounded-md p-4">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="w-[2rem]"
                src={`${user.image.png}`}
                alt={`The profile picture of ${user.username}`}
              />
              <span className="text-darkBlue font-bold">{user.username}</span>
              {state.currentUser.username === user.username && <span className='bg-moderateBlue  text-sm text-white px-[5px]'>you</span>}
              <span className="text-grayishBlue">{createdAt}</span>
            </div>
            <div className="max-[599px]:hidden">{getCurrentUser(user)}</div>
          </div>
          {!isEditing ? (
            <p className="my-4 text-grayishBlue">
              {replyingTo && (
                <span className="text-moderateBlue font-bold">
                  @{replyingTo}{' '}
                </span>
              )}
              {content}
            </p>
          ) : (
            <CommentsUpdate
              id={id}
              content={content}
              replyingTo={replyingTo}
              setEdit={setEditing}
            />
          )}
        </div>
        <div className="sm:order-first flex items-center justify-between">
          <CommentsUpvotes score={score} id={id} user={user}/>
          <div className="sm:hidden">{getCurrentUser(user)}</div>
        </div>
      </article>
      {isReply && (
        <Reply
          setIsReply={setIsReply}
          buttonLabel="Reply"
          type={reducerAction.ADD_REPLY}
          replyingTo={user.username}
          parentId={parentId}
        />
      )}
      {isDeleting && <DeleteModal setDeleting={setDeleting} id={id} />}
    </>
  )
}

export default SingleComments