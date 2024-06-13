import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      </DialogContent>
    </Dialog>
  );
};

export default ChatDashboardDialog;
