import React, { useState, useEffect } from "react";
import NewGroupDialog from "./MyChatsComponents/NewGroupDialog";
import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "./MyChatsComponents/ChatPreview";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NewChatDialog from "./MyChatsComponents/NewChatDialog";
import LoggedInUser from "./MyChatsComponents/LoggedInUser";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const MyChats = ({ fetchAgain }) => {
  const { toast } = useToast();
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error accessing chat",
        description: "Something went wrong.",
      });
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.isGroupChat
      ? chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
      : chat.users.some(
          (user) =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user._id !== loggedUser._id
        )
  );

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        setLoggedUser(JSON.parse(userInfo));
      } else {
        setLoggedUser(null);
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      setLoggedUser(null); // Handle JSON parse error
    }
    setIsLoading(false);
    fetchChats();
  }, [fetchAgain]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-[#494959] h-[760px] w-[380px] rounded-[8px] flex flex-col">
      <div className="flex w-[380px] gap-3 pt-4 pl-5">
        <div className="flex">
          <input
            className="w-[220px] h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <NewChatDialog />
        </div>
        <NewGroupDialog />
      </div>

      <div className="flex flex-col pt-8 items-center h-[610px]">
        {filteredChats.length > 0 ? (
          <ScrollArea className="flex flex-col gap-5 w-[338px]">
            {filteredChats.map((chat) => (
              <React.Fragment key={chat._id}>
                <a onClick={() => setSelectedChat(chat)}>
                  <ChatPreview
                    chat={chat}
                    selectedChat={selectedChat}
                    loggedUser={loggedUser}
                    user={user}
                  />
                </a>
                <Separator className="my-2.5 bg-[#494959]" />
              </React.Fragment>
            ))}
          </ScrollArea>
        ) : (
          <div>No chats found.</div> // Display when no chat matches the search term
        )}
      </div>

      <div className="pt-6 pl-3">
        <div className="flex flex-row w-[322px] h-[60px] rounded-[10px] items-center pl-2 underline">
          <Avatar className="cursor-pointer">
            {loggedUser ? (
              <AvatarImage src={loggedUser.picture} />
            ) : (
              <AvatarFallback>U</AvatarFallback> // Show fallback if no picture is available
            )}
          </Avatar>
          <LoggedInUser
            selectedChat={selectedChat}
            loggedUser={loggedUser}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChats;
