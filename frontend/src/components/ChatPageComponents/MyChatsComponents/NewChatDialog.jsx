import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import UserListItem from "./UserListItem";
import { X } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import NewChat from "./NewChat";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const NewChatDialog = () => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { toast } = useToast();
  const { user, setChats, setSelectedChat } = ChatState();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResults(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error searching",
        description: error.response?.data.message || "Could not search users.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChat = async () => {
    if (selectedUsers.length === 0) {
      toast({
        variant: "destructive",
        title: "No users selected",
        description: "Please select at least one user to start a chat.",
      });
      return;
    }

    const isGroupChat = selectedUsers.length > 1 || groupChatName;
    const userIds = selectedUsers.map((u) => u._id);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const body = isGroupChat
      ? {
          name: groupChatName || "New Group",
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        }
      : {
          userId: selectedUsers[0]._id,
        };

    try {
      const { data } = await axios.post(
        `/api/chat${isGroupChat ? "/group" : ""}`,
        body,
        config
      );
      setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
      toast({ title: "Chat created successfully" });
    } catch (error) {
      console.error("Failed to create chat:", error.response?.data.message);
      toast({
        variant: "destructive",
        title: "Error creating chat",
        description: error.response?.data.message || "Could not create chat.",
      });
    }
  };

  const handleAddUser = (newUser) => {
    if (selectedUsers.some((user) => user._id === newUser._id)) {
      setSelectedUsers(
        selectedUsers.filter((user) => user._id !== newUser._id)
      );
    } else {
      setSelectedUsers([...selectedUsers, newUser]);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a>
          <NewChat />
        </a>
      </DialogTrigger>
      <DialogContent className="bg-[#494959] sm:max-w-[425px] rounded flex flex-col items-center border-[#494959] overflow-y-auto max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="text-[#CFDBEC]">
            {selectedUsers.length > 1
              ? "Start a new group chat"
              : "Start a new chat"}
          </DialogTitle>
          <DialogDescription className="text-[#CFDBEC]">
            <Label>Search for the users you want to have in the group.</Label>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center">
          <input
            placeholder="Search for users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-2 mb-2 h-[40px] w-full bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] pl-2 rounded-lg focus:outline-none"
          />
          <div className="mb-4">
            {searchResults.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                checked={selectedUsers.some(
                  (selectedUser) => selectedUser._id === user._id
                )}
                handleFunction={() => handleAddUser(user)}
              />
            ))}
          </div>
          {selectedUsers.length > 1 && (
            <input
              placeholder="Group Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              className="h-[40px] w-full bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] pl-2 rounded-lg focus:outline-none"
            />
          )}
          <div className="mt-2">
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
          <Button onClick={handleCreateChat} className="mt-2">
            Create {selectedUsers.length > 1 ? "Group Chat" : "Chat"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
