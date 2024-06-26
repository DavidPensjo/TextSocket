import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";
import ChatDashboard from "@/components/ChatPageComponents/ChatBoxComponents/ChatDashboard";
import ChatBox from "@/components/ChatPageComponents/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user, isLoading, selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center pb-10 bg-gray-700">
      <div className="w-[1000px] h-[800px] flex gap-5 bg-[#2B2B3C] rounded-[15px] p-4">
        {user && <MyChats fetchAgain={fetchAgain} />}
        <div className="flex flex-col justify-between h-[750px] w-[600px]">
          {selectedChat && (
            <ChatBox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              className="m-5"
            />
          )}
          {!selectedChat && (
            <div className="m-5 flex justify-center items-center h-full">
              <h1 className="text-[#94A3B8] font-bold text-xl items-center pb-60">SELECT OR CREATE NEW CHAT</h1>              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
