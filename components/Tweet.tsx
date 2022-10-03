import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  ChatBubbleLeftIcon,
  ArrowsUpDownIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { Tweet, Comment, CommentBody } from "../typings";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const {data:session} = useSession()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };
  useEffect(() => {
    refreshComments();
  }, []);
  console.log(comments);

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />
        <div className="">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <Moment
              className="text-sm text-gray-500"
              date={tweet._createdAt}
              format="DD MMM YYYY"
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 max-w-60 rounded-lg object-cover shadow-sm "
            />
          )}
        </div>
      </div>
      <div className="flex mt-5 justify-between">
        <div onClick={()=> session && setCommentBoxVisible(!commentBoxVisible)} className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleLeftIcon  className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsUpDownIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input value={input} onChange={(e)=> setInput(e.target.value)} className="flex-1 rounded-lg bg-gray-100 p-2 outline-none" type="text" placeholder="write a comment" />
          <button type="submit" className="text-twitter disabled:text-gray-200">Post</button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-hidden border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div className="flex space-x-2 relative" key={comment._id}>
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={comment.profileImg}
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1 ">
                  <p className="mr-1 font-bold text-sm text-gray-500 lg:inline">
                    {comment.username}
                  </p>
                  <Moment
                    className="text-sm text-gray-500"
                    date={tweet._createdAt}
                    format="DD MMM YYYY"
                  />
                </div>
              <p>{comment.comment}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
