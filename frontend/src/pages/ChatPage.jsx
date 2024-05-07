import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";

const ChatPage = () => {
  const { user } = ChatState();
  console.log(user);
  return <div className="w-full">{user && <MyChats />}</div>;
};

export default ChatPage;
