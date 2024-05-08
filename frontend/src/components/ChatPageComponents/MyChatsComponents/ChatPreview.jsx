import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSender } from "@/config/ChatLogics";
const ChatPreview = ({ selectedChat, chat, loggedUser, user }) => {
  return (
    <div
      className={`h-[80px] w-[330px] rounded-xl grid grid-cols-7 grid-rows-3 cursor-pointer ${
        selectedChat === chat ? "bg-slate-700" : "bg-[#676773]"
      }`}
    >
      <div className="col-start-1 row-start-2 flex items-center justify-center pl-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-white font-extrabold text-base col-start-2 row-start-1 col-span-4 pt-1 pl-4">
        {!chat.isGroupChat ? getSender(loggedUser, chat) : chat.chatName}
      </p>
      <p className="text-[#CFDBEC] text-sm col-start-2 row-start-2 col-span-5 pl-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="text-[#CFDBEC] text-sm col-start-7 row-start-1 pt-1">
        07:54
      </p>
    </div>
  );
};

export default ChatPreview;
