import React,{useState} from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typings";
import TweetComponent from "../components/Tweet";
import {fetchTweets} from '../utils/fetchTweets'
import toast from 'react-hot-toast'
interface Props {
  tweets: Tweet[];
  handleClick:any
}
function Feed({ tweets:tweetsProp,handleClick }: Props) {
  const [tweets,setTweets ] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async ()=>{
    const refreshToast = toast.loading('refreshing')
      const tweets = await fetchTweets();
      setTweets(tweets)
      toast.success('feed updated', {
        id:refreshToast,
      })
  
  }
  return (
<div className="col-span-7 lg:col max-h-screen overflow-scroll scrollbar-hide lg:col-span-5 border-x">
      <div className="flex items-center justify-between ">
        <h1 className="p-5 pb-0 text-xl font-bold ">Home</h1>
        <ArrowPathIcon onClick={handleRefresh} className=" h-8 w-8 mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
      <div>
        <TweetBox handleClick={handleClick} setTweets= {setTweets} />
      
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
