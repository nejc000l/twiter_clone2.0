import React from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
function Widgets() {
  return (
    <div className=" px-2 hidden mt-2 col-span-2 lg:inline ">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 " />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent flex-1 outline-none"
        />
      </div>

      <TwitterTimelineEmbed
      sourceType="profile"
        screenName="saurabhnemade"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets