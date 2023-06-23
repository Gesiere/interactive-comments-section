import { useGlobalCommentsContext } from '../commetsHooks/CommentsProvider'





import Reply from './Reply'

import SingleComments from './SingleComments'

const CommentsContainer = () => {
  const { state, reducerAction} = useGlobalCommentsContext()

  
  return (
    <div className=" my-[2rem] md:my-[4rem]">
      {state.comments.map((comment, index) => 
      (
        <div key={index}>
          <SingleComments parentId={comment.id} {...comment}  />

          {comment.replies.length !== 0  && (
            <div className="replies max-w-[90%] md:max-w-[600px] ml-auto">
              <div className="line">
                {comment.replies.map((replies, index) => (
                  <SingleComments parentId={comment.id} {...replies} key={index}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )
      )}
      <Reply type={reducerAction.ADD_COMMENT} buttonLabel="Send" />
    </div>
  )
}

export default CommentsContainer
