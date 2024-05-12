import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";

const ChatDashboard = () => {
  const { selectedChat, loggedUser } = ChatState();
  const [sender, setSender] = useState(null);

  useEffect(() => {
    if (selectedChat && !selectedChat.isGroupChat) {
      // Assuming there are only two users in the chat, filter out the loggedUser
      const otherUser = selectedChat.users.find(
        (user) => user._id !== loggedUser._id
      );
      setSender(otherUser);
    } else {
      // For group chats or other scenarios, handle accordingly
      setSender(null); // or set to a default group chat user object if needed
    }
  }, [selectedChat, loggedUser]);

  if (!sender) {
    return <div>Loading or no other participant...</div>; // Handle no sender or loading state
  }

  return (
    <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px]">
      <div className="flex flex-row items-center h-[80px] pl-5">
        <Avatar className="cursor-pointer">
          <AvatarImage src={sender.picture || "default_fallback_picture_url"} />
          <AvatarFallback>
            {sender.userName ? sender.userName[0] : "U"}
          </AvatarFallback>
        </Avatar>
        <span className="text-[#94A3B8] font-bold text-xl pl-3 pt-1 cursor-pointer">
          {sender.userName}
        </span>
        <div className="flex flex-row text-[#CFDBEC] gap-4 ml-auto pr-5">
          <a>
            <Users className="h-[29px] w-[29px]" />
          </a>
          <a>
            <UserPlus className="h-[29px] w-[29px]" />
          </a>
          <a>
            <UserMinus className="text-[#CA5E5E] h-[29px] w-[29px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
