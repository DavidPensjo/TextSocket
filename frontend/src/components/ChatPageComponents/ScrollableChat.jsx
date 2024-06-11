import React, { useEffect, useState, useRef, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "@/config/ChatLogics";
import ChatDashboard from "./ChatDashboard";
import { ChatState } from "@/Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user, selectedChat } = ChatState();
  const scrollRef = useRef(null);

  const sender = useMemo(() => {
    return selectedChat?.users.find((u) => u._id !== user._id) || null;
  }, [selectedChat, user]);

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [safeMessages]);

  return (
    <>
      <ChatDashboard sender={sender} />
      <div className="h-[600px] w-[575px]">
        <div
          ref={scrollRef}
          className="h-[600px] w-[575px] overflow-y-auto flex flex-col-reverse"
        >
          {safeMessages.map((m, i) => (
            <div className="flex items-center mr-6" key={m._id}>
              {(isSameSender(safeMessages, m, i, user._id) ||
                isLastMessage(safeMessages, i, user._id)) && (
                <TooltipProvider key={m._id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="cursor-pointer mt-1 mr-1">
                        <AvatarImage
                          src={m.sender.picture || "defaultAvatar.webp"}
                        />
                        <AvatarFallback>
                          {m.sender.userName?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{m.sender.userName}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <span
                className={`rounded-[20px] p-2 max-w-[75%] text-[#cfdbec] ${
                  m.sender._id === user._id ? "bg-indigo-600" : "bg-[#494959]"
                }`}
                style={{
                  marginLeft: isSameSenderMargin(
                    safeMessages,
                    m,
                    i,
                    user._id
                  ),
                  marginTop: isSameUser(safeMessages, m, i) ? 3 : 10,
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollableChat;
