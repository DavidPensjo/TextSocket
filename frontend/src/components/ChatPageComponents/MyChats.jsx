import React, { useState, useEffect } from "react";
import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "./MyChatsComponents/ChatPreview";
import NewGroupDialog from "./MyChatsComponents/NewGroupDialog";
import NewChatDialog from "./MyChatsComponents/NewChatDialog";
import LoggedInUser from "./MyChatsComponents/LoggedInUser";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

const MyChats = ({ fetchAgain }) => {
  const { toast } = useToast();
  const { user, selectedChat, setSelectedChat, chats, setChats, loggedUser } =
    ChatState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (user && user.token) {
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
      }
    };

    fetchChats();
  }, [user, fetchAgain, setChats, toast]);

  const filteredChats = chats
    .filter((chat) => chat.latestMessage) // Filter out chats with no messages
    .filter((chat) =>
      chat.isGroupChat
        ? chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
        : chat.users.some(
            (chatUser) =>
              chatUser.userName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              chatUser._id !== loggedUser?._id
          )
    );

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="bg-[#494959] h-[760px] w-[380px] rounded-[8px] flex flex-col">
      <div className="flex w-[380px] pt-4 pl-5">
        <input
          className="w-[290px] h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <NewChatDialog />
        {/* <NewGroupDialog /> */}
      </div>
      <div className="flex flex-col pt-8 items-center h-[610px]">
        {filteredChats.length > 0 ? (
          <ScrollArea className="flex flex-col gap-5 w-[348px]">
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
          <div>No chats found.</div>
        )}
      </div>
      <div className="pt-6 pl-3">
        <div className="flex flex-row w-[322px] h-[60px] rounded-[10px] items-center pl-2 underline">
          <Avatar className="cursor-pointer">
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

export default MyChats;
