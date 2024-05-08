import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";
import ChatDashboard from "@/components/ChatPageComponents/ChatDashboard";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div className="w-full flex gap-5">
      {user && <MyChats />}
      {user && <ChatDashboard />}
    </div>
  );
};

export default ChatPage;
