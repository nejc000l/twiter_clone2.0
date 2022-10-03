import React from "react";
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
import {signIn, signOut,useSession} from 'next-auth/react'
function Sidebar() {
  const{data:session} = useSession();

  return (
    <div className=" col-span-2 items-center md:items-start flex flex-col">
      <img className="h-10 w-10" src="https://links.papareact.com/drq" alt="" />
      <SidebarRow title="Home" Icon={HomeIcon} />
      <SidebarRow title="Notification" Icon={BellIcon} />
      <SidebarRow title="Explore" Icon={HashtagIcon} />
      <SidebarRow title="Messages" Icon={EnvelopeIcon} />
      <SidebarRow title="Bookmarks" Icon={BookmarkIcon} />
      <SidebarRow title="List" Icon={CircleStackIcon} />
      <SidebarRow onClick={session ? signOut: signIn} title={session ? 'Sign Out': 'Sign In'} Icon={UserIcon} />
      <SidebarRow title="More" Icon={EllipsisHorizontalIcon} />
    </div>
  );
}

export default Sidebar;
