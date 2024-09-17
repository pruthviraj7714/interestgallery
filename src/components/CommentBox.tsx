export default function CommentBox({ comment, onDelete }: { comment: any, onDelete : () => void }) {
    return (
      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex justify-center items-center font-bold text-lg">
          {comment?.user?.username.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900 dark:text-white">
              {comment?.user?.firstname} {comment?.user?.lastname}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{comment.text}</div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="text-xs">4w</div>
            <button onClick={onDelete} className="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    );
  }
  