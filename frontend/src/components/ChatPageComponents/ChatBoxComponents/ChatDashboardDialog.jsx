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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const ChatDashboardDialog = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [chatUsers, setChatUsers] = useState(selectedChat.users);
  const [groupName, setGroupName] = useState(selectedChat.chatName);
  const [groupPicture, setGroupPicture] = useState(selectedChat.groupPicture);
  const { toast } = useToast();

  const removeUserFromState = (userId) => {
    setChatUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `/api/chat/rename`,
        { chatId: selectedChat._id, chatName: groupName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedChat(data);
      toast({
        title: "Group name updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update group name.",
      });
    }
  };

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.put(
        `/api/chat/grouppicture/${selectedChat._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGroupPicture(data.groupPicture);
      setSelectedChat(data);
      toast({
        title: "Group picture updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update group picture.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Users className="h-[29px] w-[29px] mt-2" />
      </DialogTrigger>
      <DialogContent className="bg-[#494959] sm:max-w-[425px] sm:min-w-[425px] rounded flex flex-col items-center border-[#494959] overflow-y-auto max-h-[800px]">
        {selectedChat.isGroupChat && (
          <div className="flex w-full p-4">
            <div className="relative inline-block h-[100px] w-[100px] mr-4">
              <img
                className="h-full w-full rounded-full transition-transform duration-300 transform hover:scale-110 hover:opacity-80"
                src={groupPicture}
                alt="group picture"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <label className="text-white pl-3 cursor-pointer">
                  Change Icon
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <p className="text-[#CFDBEC] font-bold">Group Name</p>
              <Input
                className="bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC]"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button onClick={handleSaveChanges}>Save Changes</Button>
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
