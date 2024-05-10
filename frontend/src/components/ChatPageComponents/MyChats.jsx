import { useState, useEffect } from "react";
import NewGroupDialog from "./MyChatsComponents/NewGroupDialog";
import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "./MyChatsComponents/ChatPreview";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NewChatDialog from "./MyChatsComponents/NewChatDialog";
import LoggedInUser from "./MyChatsComponents/LoggedInUser";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";

const MyChats = ({ fetchAgain }) => {
  const { toast } = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
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
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="bg-[#494959] h-[760px] w-[380px] rounded-[8px] flex flex-col">
      <div className="flex w-[380px] gap-3 pt-4 pl-5">
        <div className="flex">
          <input
            className="w-[220px] h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
            placeholder="Search..."
          ></input>
          <NewChatDialog />
        </div>
        <NewGroupDialog />
      </div>

      <div className="flex flex-col pt-8 items-center h-[610px]">
        {chats ? (
          <ScrollArea className="flex flex-col gap-5 w-[338px]">
            {chats.map((chat) => (
              <>
                {" "}
                <a onClick={() => setSelectedChat(chat)}>
                  <ChatPreview
                    key={chat._id}
                    chat={chat}
                    selectedChat={selectedChat}
                    loggedUser={loggedUser}
                    user={user}
                  />
                </a>
                <Separator className="my-2.5 bg-[#494959]" />
              </>
            ))}
          </ScrollArea>
        ) : (
          <ChatLoading />
        )}
      </div>
      <div className="pt-6 pl-3">
        <div className="flex flex-row w-[322px] h-[60px] rounded-[10px] items-center pl-2 underline">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.picture} />
            <AvatarFallback>CN</AvatarFallback>
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
