import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatDashboardDialog from "./ChatDashboardDialog";
import { ChatState } from "@/Context/ChatProvider";
import { ArrowLeft } from "lucide-react";

const ChatDashboard = ({ sender }) => {
  if (!sender) {
    return null;
  }
  const { selectedChat, setSelectedChat } = ChatState();

  return (
    <div className="bg-[#494959] h-[80px] w-screen lg:w-[560px] lg:h-[80px] lg:rounded-[8px] mb-2">
      <div className="flex flex-row items-center h-[80px]">
        <a
          onClick={() => setSelectedChat(null)}
          className="pl-2 pr-2 h-full flex flex-col justify-center lg:hidden"
        >
          <ArrowLeft className="text-[#CFDBEC]" />
        </a>
        <Avatar className="ml-5">
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
        <span className="text-[#94A3B8] font-bold text-xl pl-3 pt-1">
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
