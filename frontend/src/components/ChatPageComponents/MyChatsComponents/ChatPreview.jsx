import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSender } from "@/config/ChatLogics";

const ChatPreview = ({ selectedChat, chat, loggedUser }) => {
  const getOtherParticipant = (chat, loggedUserId) => {
    return chat.users?.find((user) => user?._id !== loggedUserId);
  };

  const otherParticipant = chat.isGroupChat
    ? null
    : getOtherParticipant(chat, loggedUser?._id);

  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const adjustedTime = chat.latestMessage
    ? formatTime(chat.latestMessage.createdAt)
    : "";
  return (
    <div
      className={`ml-1 h-[80px] w-[340px] rounded-xl grid grid-cols-7 grid-rows-3 cursor-pointer justify-center ${
        selectedChat === chat ? "bg-slate-700" : "bg-[#676773]"
      }`}
    >
      <div className="col-start-1 row-start-2 flex items-center justify-center pl-3">
        <Avatar>
          {otherParticipant ? (
            <AvatarImage
              src={otherParticipant.picture || "defaultAvatar.webp"}
            />
          ) : chat.groupPicture ? (
            <AvatarImage
              className="font-semibold"
              src={chat.groupPicture}
            />
          ) : (
            <AvatarFallback>
              {chat?.chatName ? chat.chatName[0] : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <p className="text-white font-extrabold text-base col-start-2 row-start-1 col-span-4 pt-1 pl-4">
        {!chat.isGroupChat ? getSender(loggedUser, chat) : chat.chatName}
      </p>
      <div className="text-[#CFDBEC] text-sm col-start-2 row-start-2 col-span-5 pl-4">
        {chat.latestMessage && (
          <span style={{ fontSize: "small" }}>
            <b>{chat.latestMessage.sender.userName} : </b>
            {chat.latestMessage.content.length > 50
              ? `${chat.latestMessage.content.substring(0, 51)}...`
              : chat.latestMessage.content}
          </span>
        )}
      </div>
      <p className="text-[#CFDBEC] text-sm col-start-7 row-start-1 pt-1">
        {adjustedTime}
      </p>
    </div>
  );
};

export default ChatPreview;
