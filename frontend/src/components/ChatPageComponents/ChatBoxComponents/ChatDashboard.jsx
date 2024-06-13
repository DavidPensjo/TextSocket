import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatDashboardDialog from "./ChatDashboardDialog";
import { ChatState } from "@/Context/ChatProvider";
const ChatDashboard = ({ sender }) => {
  if (!sender) {
    return null;
  }
  const { selectedChat } = ChatState();
  console.log(selectedChat);
  return (
    <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px]">
      <div className="flex flex-row items-center h-[80px] pl-5">
        <Avatar className="cursor-pointer">
          {selectedChat.isGroupChat ? (
            <AvatarImage
              src={selectedChat.groupPicture || "default_fallback_picture_url"}
            />
          ) : (
            <AvatarImage
              src={sender.picture || "default_fallback_picture_url"}
            />
          )}
          {selectedChat.isGroupChat ? (
            <AvatarFallback>
              {selectedChat.chatName ? selectedChat.chatName[0] : "U"}
            </AvatarFallback>
          ) : (
            <AvatarFallback>
              {sender.userName ? sender.userName[0] : "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-[#94A3B8] font-bold text-xl pl-3 pt-1 cursor-pointer">
          {selectedChat.isGroupChat ? selectedChat.chatName : sender.userName}
        </span>
        <div className="flex flex-row text-[#CFDBEC] gap-4 ml-auto pr-5">
          <a>
            <ChatDashboardDialog />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
