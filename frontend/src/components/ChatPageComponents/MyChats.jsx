import React from "react";
import { ChatState } from "@/Context/ChatProvider";
const MyChats = () => {
  const { user } = ChatState();
  return <div>welcome {user.userName}</div>;
};

export default MyChats;
