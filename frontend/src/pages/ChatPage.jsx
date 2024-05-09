import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";
import ChatDashboard from "@/components/ChatPageComponents/ChatDashboard";
import ChatBox from "@/components/ChatPageComponents/ChatBox";
import ChatMessages from "@/components/ChatPageComponents/ChatMessages";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div className="w-[1000px] h-[800px] flex gap-5 bg-[#2B2B3C] rounded-[15px] p-4">
      {user && <MyChats />}
      <div className="flex flex-col justify-between h-[750px]">
        {user && <ChatDashboard />}
        {user && <ChatMessages  className="h-[600px]"/>}
        {user && <ChatBox className="m-5" />}
      </div>
    </div>
  );
};

export default ChatPage;
