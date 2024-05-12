import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, UserMinus } from "lucide-react";

const ChatDashboard = ({ sender }) => {

  if (!sender) {
    return null;
  }
  console.log(sender);
  return (
    <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px]">
      <div className="flex flex-row items-center h-[80px] pl-5">
        <Avatar className="cursor-pointer">
          <AvatarImage src={sender.picture || "default_fallback_picture_url"} />
          <AvatarFallback>{sender.userName ? sender.userName[0] : "U"}</AvatarFallback>
        </Avatar>
        <span className="text-[#94A3B8] font-bold text-xl pl-3 pt-1 cursor-pointer">
          {sender.userName}
        </span>
        <div className="flex flex-row text-[#CFDBEC] gap-4 ml-auto pr-5">
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
