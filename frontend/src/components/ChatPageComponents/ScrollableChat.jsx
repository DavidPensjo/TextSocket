import React, { useEffect, useState, useMemo } from "react";
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
  const sender = useMemo(() => {
    return selectedChat?.users.find((u) => u._id !== user._id) || null;
  }, [selectedChat, user]);

  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <>
      <ChatDashboard sender={sender} />
      <div className="h-[600px] w-[575px]">
        <ScrollArea className="h-[600px] w-[575px] overflow-y-auto">
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
                style={{
                  backgroundColor:
                    m.sender._id === user._id ? "#4f46e5" : "#494959",
                  marginLeft: isSameSenderMargin(safeMessages, m, i, user._id),
                  marginTop: isSameUser(safeMessages, m, i) ? 3 : 10,
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
        </ScrollArea>
      </div>
    </>
  );
};

export default ScrollableChat;
