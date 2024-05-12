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
import ChatLoading from "./ChatSkeleton";
import UserListItem from "./UserListItem";

const NewChatDialog = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { toast } = useToast();
  const history = useHistory();

  const handleSearch = async () => {
    if (!search) {
      toast({
        variant: "destructive",
        title: "Error searching",
        description: "Enter a username to search.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (err) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error searching",
        description: err.response.data.message || "Something went wrong.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      const chatExists = chats.find((chat) => chat._id === data._id);
      if (!chatExists) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      setLoadingChat(false);
      toast({
        variant: "destructive",
        title: "Error accessing chat",
        description: error.response.data.message || "Something went wrong.",
      });
    }
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
            Start a new conversation.
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-[#CFDBEC]">
          <Label>Enter the username of the person you want to chat with.</Label>
        </DialogDescription>
        <DialogDescription className="flex flex-row w-full pl-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[40px] w-4/5 bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
            placeholder="Search..."
          ></input>
          <button
            onClick={handleSearch}
            className="w-[40px] h-[40px] hover:bg-slate-600 active:bg-[#2B2B3C] focus:bg-[#2B2B3C] transition ease-out delay-150  bg-[#2B2B3C] border-[#5E6875] border-2 text-[#CFDBEC] rounded-r-[10px] flex justify-center items-center"
          >
            <Search />
          </button>
        </DialogDescription>

        {loading ? (
          <ChatLoading />
        ) : (
          searchResults?.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
