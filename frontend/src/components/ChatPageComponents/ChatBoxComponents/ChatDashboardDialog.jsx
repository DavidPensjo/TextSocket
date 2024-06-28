import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import UserListItem from "../MyChatsComponents/UserListItem";

const ChatDashboardDialog = () => {
  const { user, selectedChat } = ChatState();
  const [chatUsers, setChatUsers] = useState(selectedChat.users);

  const removeUserFromState = (userId) => {
    setChatUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Users className="h-[29px] w-[29px] mt-2" />
      </DialogTrigger>
      <DialogContent className="bg-[#494959] sm:max-w-[425px] sm:min-w-[425px] rounded flex flex-col items-center border-[#494959] overflow-y-auto max-h-[800px]">
        <DialogHeader className="flex">
          <DialogTitle className="text-[#CFDBEC]">Manage chat</DialogTitle>
        </DialogHeader>
        <div className="text-[#CFDBEC] w-full">
          {chatUsers.map((chatUser) => (
            <UserListItem
              key={chatUser._id}
              user={chatUser}
              chatId={selectedChat._id}
              token={user.token}
              renderChatOptions={true}
              updateUsersList={removeUserFromState}
            />
          ))}
        </div>
        {selectedChat.isGroupChat && (
          <div className="text-[#CFDBEC] w-full flex">
            <div className="relative inline-block h-[80px] w-[80px]">
              <img
                className="h-full w-full rounded-full transition-transform duration-300 transform hover:scale-110 hover:opacity-80"
                src={selectedChat.groupPicture}
                alt="group picture"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white pl-3 cursor-pointer">Change Icon</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ChatDashboardDialog;
