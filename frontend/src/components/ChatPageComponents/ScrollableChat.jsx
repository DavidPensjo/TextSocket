import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatState } from "@/Context/ChatProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";

import ChatDashboard from "./ChatDashboard";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const [focusedSender, setFocusedSender] = useState(null);

  useEffect(() => {
    const fs =
      messages
        .slice()
        .reverse()
        .find((m) => m.sender._id !== user._id)?.sender || null;
    setFocusedSender(fs);
  }, [messages, user]);

  return (
    <>
      <ChatDashboard sender={focusedSender} />
      <ScrollArea className="h-[600px] w-[575px]">
        <div className="h-[600px] w-[550px]">
          {messages &&
            messages.map((m, i) => (
              <div className="flex items-center" key={m._id}>
                {(isSameSender(messages, m, i, user._id) ||
                  isLastMessage(messages, i, user._id)) && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar className="cursor-pointer mt-1 mr-1">
                          <AvatarImage src={m.sender.picture} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{m.sender.userName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <span
                  style={{
                    backgroundColor: `${
                      m.sender._id === user._id ? "#4f46e5" : "#494959"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    color: "#cfdbec",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ScrollableChat;
