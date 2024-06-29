import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
        {selectedChat.isGroupChat && (
          <div className="flex ">
            <div className="text-[#CFDBEC] w-full flex">
              <div className="relative inline-block h-[100px] w-[100px]">
                <img
                  className="h-full w-full rounded-full transition-transform duration-300 transform hover:scale-110 hover:opacity-80"
                  src={selectedChat.groupPicture}
                  alt="group picture"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white pl-3 cursor-pointer">
                    Change Icon
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-0.5">
              <p className="text-[#CFDBEC] font-bold">Group Name</p>
              <Input
                className=" bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC]"
                type="text"
                defaultValue={selectedChat.chatName}
              />
              <Button>Save Changes</Button>
            </div>
          </div>
        )}
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
      </DialogContent>
    </Dialog>
  );
};
export default ChatDashboardDialog;
