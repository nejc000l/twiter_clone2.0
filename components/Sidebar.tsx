import React, { useState,useEffect } from "react";
import SidebarRow from "./SidebarRow";
import {
  BellIcon,
  HomeIcon,
  HashtagIcon,
  EnvelopeIcon,
  BookmarkIcon,
  CircleStackIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
type Props = {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  
};
function Sidebar({ handleClick}: Props) {
  const [toggleBoxVisible, settoggleBoxVisible] = useState<boolean>(false);

  const { data: session } = useSession();
  const [toggle, setToggle] = useState(true);
  useEffect(()=>{
    const data:any = window.localStorage.getItem('my_toggle_button')
   setToggle(JSON.parse(data)) 
  },[])
  useEffect(()=>{
    window.localStorage.setItem('my_toggle_button', JSON.stringify(toggle))

  },[toggle])
  const toggleClass = " transform translate-x-5";
  return (
    <div className=" col-span-2 items-center md:items-start flex flex-col">
      <img className="h-10 w-10" src="https://links.papareact.com/drq" alt="" />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Notification" Icon={BellIcon} />
      <SidebarRow title="Explore" Icon={HashtagIcon} />
      <SidebarRow title="Messages" Icon={EnvelopeIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="List" Icon={CircleStackIcon} />
      <SidebarRow
        onClick={session ? signOut : signIn}
        title={session ? "Sign Out" : "Sign In"}
        Icon={UserIcon}
      />
      <SidebarRow title="More" Icon={EllipsisHorizontalIcon} />
      {session && (
        <div className="hidden md:flex flex-col-screen items-center px-4">
          <p>Toggle background </p>
          <div onClick={handleClick}>
            <div
              className=" md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full  p-1 ml-3 cursor-pointer"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <div
                className={
                  "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                  (toggle ? null : toggleClass)
                }
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
