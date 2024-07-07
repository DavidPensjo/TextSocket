import { ChatState } from "@/Context/ChatProvider";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import ChatPageMobile from "@/components/ChatPageComponents/ChatPageMobile";
import ChatPageDesktop from "@/components/ChatPageComponents/ChatPageDesktop";

const ChatPage = () => {
  const { isLoading } = ChatState();
  const { width } = useWindowSize();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return width < 1028 ? <ChatPageMobile /> : <ChatPageDesktop />;
};

export default ChatPage;
