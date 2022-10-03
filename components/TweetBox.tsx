import React, { Dispatch,SetStateAction, useRef,useState } from "react";
import {CameraIcon,MagnifyingGlassIcon,FaceSmileIcon,CalendarDaysIcon,MapPinIcon} from '@heroicons/react/24/outline'
import {useSession} from 'next-auth/react'
import {TweetBody,Tweet} from '../typings'
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";
interface Props{
  setTweets:  Dispatch<SetStateAction<Tweet[]>>
}
function TweetBox({setTweets}:Props) {
    const [input, setInput] = useState<string>('')
    const [image,setImage] = useState<string>('')
    const {data:session} = useSession()
    const imageInputRef = useRef<HTMLInputElement>(null)


    const [imageUrlBoxIsOpend,setImageUrlBoxIsOpend] = useState<boolean>(false)
    const addImageToTweet=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
     
      e.preventDefault()
        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpend(false)
    }
    
    const postTweet = async()=>{
      const tweetInfo: TweetBody ={
        text: input,
        username: session?.user?.name || 'Uknown User',
        profileImg:session?.user?.image || 'https://links.papareact.com/gll',
        image:image,
        
      }
      const result = await fetch(`/api/addTweet`,{
        body: JSON.stringify(tweetInfo),
        method:'POST'
      })
      const json = await result.json()
      
      const newTweets = await fetchTweets()

      setTweets(newTweets)
      toast('tweet posted',{
        icon:'😉'
      })
      return json
    }
    const handleSumbit = ( e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>{
      e.preventDefault();
      postTweet()
      setInput('')
      setImage('')
      setImageUrlBoxIsOpend(false)
    }
  return (
    <div  className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rou nded-full object-cover mt-4"
        src={session?.user?.image || "https://links.papareact.com/gll"}
      />

      <div className="flex flex-1 items-center pl-2 ">
        <form  className="flex flex-1 flex-col">
          <input 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
            className="outline-none h-24 text-xl w-full placeholder:text-xl"
            placeholder="Type your message"
            type="text"
          />
          <div className="flex items-center">
            <div className="flex flex-1  space-x-2 text-twitter">
            <CameraIcon onClick={()=>setImageUrlBoxIsOpend(!imageUrlBoxIsOpend)} className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
            <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
            <FaceSmileIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
            <CalendarDaysIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
            <MapPinIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
            </div>
            <button  onClick={ handleSumbit} disabled={!input || !session} className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">Tweet
            </button>
          </div>
          {imageUrlBoxIsOpend && (
            <form className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4">
              <input 
              ref={imageInputRef}  
              className="flex-1 bg-transparent p-2 text-white 
              outline-none placeholder:text-white " 
              placeholder="Enter image url" 
              type="text" 
              />
              <button className="font-bold text-white" onClick={addImageToTweet}>Add Image
              </button>
            </form>
          )}
          {image&&(
            <img className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg" 
            src={image} alt=""/>
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
