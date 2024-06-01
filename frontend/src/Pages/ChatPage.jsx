import { ChatState } from "@/Context/ChatProvider";
import MyChats from "@/components/ChatPageComponents/MyChats";
import ChatDashboard from "@/components/ChatPageComponents/ChatDashboard";
import ChatBox from "@/components/ChatPageComponents/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user, isLoading } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  console.log(user);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center pb-10 bg-gray-700">
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
    </div>
  );
};

export default ChatPage;
