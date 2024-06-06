import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewChat from "./NewChat";
import { Search } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import { useHistory } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ChatLoading from "./ChatPreviewSkeleton";
import UserListItem from "./UserListItem";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const NewChatDialog = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { toast } = useToast();

  const { user, chats, setChats, setSelectedChat } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error searching",
        description: "An error occurred while searching. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      toast({
        variant: "destructive",
        title: "Error creating chat",
        description: "Please enter a group name and select at least one user.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      toast({ title: "Chat created successfully." });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error creating chat",
        description:
          "An error occurred while creating the chat. Please try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      toast({
        variant: "destructive",
        title: "Duplicate User",
        description: "This user has already been added.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }
    setSelectedUsers((prevUsers) => [...prevUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a>
          <Button className="w-[60px] bg-[#2B2B3C] border-[#5E6875] border-2 hover:bg-slate-600 active:bg-[#2B2B3C] focus:bg-[#2B2B3C] transition ease-out delay-150 ">
            <img src="/NewGroup.png" alt="search" />
          </Button>
        </a>
      </DialogTrigger>
      <DialogContent className="bg-[#494959] sm:max-w-[425px] rounded flex flex-col items-center border-[#494959] overflow-y-auto max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="text-[#CFDBEC]">
            Start a new group chat.
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-[#CFDBEC]">
          <Label>Search for the users you want to have in the group.</Label>
        </DialogDescription>
        <DialogDescription className="flex flex-col w-full gap-4 items-center p-4">
          <Input
            onChange={(e) => setGroupChatName(e.target.value)}
            placeholder="Group name"
          />
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search users"
          />
          <div className="">
            {selectedUsers.map((user) => (
              <Badge key={user._id} user={user} className="self-start">
                {user.userName}
                <a
                  className="cursor-pointer"
                  onClick={() => handleDelete(user)}
                >
                  <X className="pl-2 pt-0.5" />
                </a>
              </Badge>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            {searchResults.slice(0, 4).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))}
          </div>
          <Button
            className="w-28 self-end"
            onClick={handleSubmit}
            key={user._id}
            user={user}
          >
            Create Chat
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
