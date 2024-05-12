import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, UserMinus } from "lucide-react";
import axios from "axios";
import { ChatState } from "@/Context/ChatProvider";

const ChatDashboard = () => {
  const { selectedChat, loggedUser, setChats } = ChatState();

  const removeUserFromChat = async () => {
    try {
      const response = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: loggedUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`, // Assuming token is stored in loggedUser
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("You have been removed from the chat.");
        // Optionally update local chat state or trigger any other updates
      } else {
        alert("Failed to remove from the chat.");
      }
    } catch (error) {
      console.error("Failed to remove user from chat:", error);
      alert("Failed to remove from the chat.");
    }
  };

  return (
    <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px]">
      <div className="flex flex-row items-center h-[80px] pl-5">
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={loggedUser?.picture || "default_fallback_picture_url"}
          />
          <AvatarFallback>{loggedUser?.userName[0] || "U"}</AvatarFallback>
        </Avatar>
        <span className="text-[#94A3B8] font-bold text-xl pl-3 pt-1 cursor-pointer">
          {loggedUser?.userName}
        </span>
        <div className="flex flex-row text-[#CFDBEC] gap-4 ml-auto pr-5">
          <Users className="h-[29px] w-[29px]" />
          <UserPlus className="h-[29px] w-[29px]" />
          <button onClick={removeUserFromChat} className="text-[#CA5E5E]">
            <UserMinus className="h-[29px] w-[29px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
