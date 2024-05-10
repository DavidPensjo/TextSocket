import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
const ChatDashboard = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  return (
    <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px] ">
      <div className="flex flex-row items-center h-[80px] pl-5">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <a className="text-[#94A3B8] font-bold text-xl pl-3 pt-1 cursor-pointer">
          {user.userName}
        </a>
        <div className="flex flex-row text-[#CFDBEC] gap-4 ml-auto pr-5 ">
          <a>
            <Users className="h-[29px] w-[29px]" />
          </a>
          <a>
            <UserPlus className="h-[29px] w-[29px]" />
          </a>
          <a>
            <UserMinus className="text-[#CA5E5E] h-[29px] w-[29px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
