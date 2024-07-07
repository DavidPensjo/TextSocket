import React, { useState, useEffect } from "react";
import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "../MyChatsComponents/ChatPreview";
import NewChatDialog from "../MyChatsComponents/NewChatDialog";
import LoggedInUser from "../MyChatsComponents/LoggedInUser";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import io from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_API_URL || "http://localhost:5000";
let socket;

const MyChatsMobile = ({ fetchAgain }) => {
  const { toast } = useToast();
  const { user, selectedChat, setSelectedChat, chats, setChats, loggedUser } = ChatState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.emit("setup", user);

    socket.on("update chat preview", (data) => {
      setChats((currentChats) => {
        const updatedChats = currentChats.map((chat) => {
          if (chat._id === data.chatId) {
            return { ...chat, latestMessage: data.latestMessage };
          }
          return chat;
        });
        return updatedChats;
      });
    });

    return () => {
      socket.off("update chat preview");
      socket.disconnect();
    };
  }, [user, setChats]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user || !user.token) return;

      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get(`/api/chat`, config);
        setChats(data);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error accessing chat",
          description: "Something went wrong.",
        });
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [user, fetchAgain, setChats, toast]);

  const filteredChats = chats
    .filter((chat) => chat.latestMessage)
    .filter((chat) =>
      chat.isGroupChat
        ? chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
        : chat.users.some(
            (chatUser) =>
              chatUser.userName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              chatUser._id !== user?._id
          )
    );

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-[#494959] h-full w-full rounded-[8px] flex flex-col justify-center items-center">
      <div className="flex w-4/5 center">
        <input
          className="w-full h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
          placeholder="Filter chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <NewChatDialog />
      </div>
      <div className="flex flex-col pt-8 items-center h-4/5">
        {filteredChats.length > 0 ? (
          <ScrollArea className="flex flex-col gap-5">
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
          <div>NO CHATS AVAILABLE</div>
        )}
      </div>
      <div className="w-screen">
        <div className="flex flex-row w-full h-[60px] rounded-[10px] items-center pl-5 underline">
          <Avatar>
            {user ? (
              <AvatarImage src={user?.picture} />
            ) : (
              <AvatarFallback>U</AvatarFallback>
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

export default MyChatsMobile;
