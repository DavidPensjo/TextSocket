import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";
import ChatDashboard from "@/components/ChatPageComponents/ChatDashboard";
import ChatBox from "@/components/ChatPageComponents/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-[1000px] h-[800px] flex gap-5 bg-[#2B2B3C] rounded-[15px] p-4">
      {user && <MyChats user={user} fetchAgain={fetchAgain} />}
      <div className="flex flex-col justify-between h-[750px]">
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            className="m-5"
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
