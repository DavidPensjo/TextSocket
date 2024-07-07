// ChatPageMobile.jsx
import { ChatState } from "@/Context/ChatProvider";
import MyChatsMobile from "./MyChats/MyChatsMobile";
import ChatBox from "./ChatBox";
import { useState } from "react";

const ChatPageMobile = () => {
  const { user, isLoading, selectedChat, setSelectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-full bg-gray-700">
      {!selectedChat ? (
        <div className="flex justify-center items-center h-full">
          {user && <MyChatsMobile fetchAgain={fetchAgain} />}
        </div>
      ) : (
        <div className="flex flex-col">
          <button 
            className="p-2 bg-blue-500 text-white"
            onClick={() => setSelectedChat(null)}
          >
            Back to Chats
          </button>
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPageMobile;
