import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { fetchTweets } from "../utils/fetchTweets";
import {Tweet} from '../typings'
import toast, { Toaster } from 'react-hot-toast';
import NightMode from "../components/NightMode";
import toggleClassCheck from '../components/NightMode'
import React,{useState,useEffect } from 'react'
interface Props {
  tweets:Tweet[]
  handleClick:React.MouseEventHandler<HTMLDivElement>
  data:any
}

const Home = ({tweets}:Props) => { 
  //console.log(tweets)
  const [btnState, setBtnState] = useState(false)
function handleClick(){
setBtnState(!btnState)

}
  const toggleClassCheck = btnState ? 'bg-black text-white':""
  useEffect(()=>{
    const data:any  = window.localStorage.getItem('my_background')
    if (data!=="" ) setBtnState(JSON.parse(data))
    console.log('my_background')
  },[])
 useEffect(()=>{
  window.localStorage.setItem('my_background', JSON.stringify(btnState))

 },[btnState])

  return (
    <div  className={toggleClassCheck}>

    <div className="  lg:max-w-10xl mx-auto max-h-auto dark:bg-slate-900 dark:text-white-200 " >
      <Head> 
        <title>Tweetler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <main className="grid grid-cols-10 ">
        <Sidebar handleClick={handleClick} />
        <Feed tweets={tweets} />
        <Widgets />
        <NightMode/>
      </main>
    </div>
   
    </div>

  );
};

export default Home;

export const getServerSideProps:GetServerSideProps = async(context)=>{
  const tweets = await fetchTweets();
  return{
    props:{
      tweets,
    }

  }
}