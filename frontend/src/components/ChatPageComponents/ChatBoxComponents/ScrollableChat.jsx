import React, { useEffect, useMemo, useRef } from "react";
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

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <>
      <ChatDashboard sender={sender} />
      <div
        ref={scrollRef}
        className="lg:w-[575px] lg:h-[600px] w-screen overflow-y-auto flex flex-col"
      >
        {safeMessages.map((m, i) => (
          <div className="flex items-center lg:ml-0 lg:mr-6 ml-2 mr-2" key={m._id}>
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
      </div>
    </>
  );
};

export default ScrollableChat;
