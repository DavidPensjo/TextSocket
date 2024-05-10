import SingleChat from "./SingleChat";
import { ChatState } from "@/Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <div className="w-[600px] h-[640px]">
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      ></SingleChat>
    </div>
  );
};

export default ChatBox;
