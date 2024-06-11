import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import ChatSkeleton from "./MyChatsComponents/ChatSkeleton";

const ENDPOINT = import.meta.env.VITE_API_URL || "http://localhost:5000";
let socket;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, user, notification, setNotification } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }, [selectedChat, user]);

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      path: "/socket.io",
    });

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
      socket.disconnect();
    };
  }, [
    user,
    selectedChat,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
  ]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${ENDPOINT}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        socket.emit("update chat preview", {
          chatId: selectedChat._id,
          latestMessage: data,
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {loading ? (
        <ChatSkeleton />
      ) : (
        <div>
          <ScrollableChat
            className="flex flex-col"
            style={{ scrollbarWidth: "none" }}
            messages={messages}
          />
        </div>
      )}
      <form
        className="w-[600px] h-[40px] flex gap-3 pt-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="w-[500px] h-[40px] bg-[#494959] border-[#2B2B3C] text-[#CFDBEC] rounded-[10px] pl-2 focus:outline-none"
          placeholder="Message..."
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <Button
          type="button"
          onClick={sendMessage}
          className="w-[40px] h-[40px] bg-indigo-600"
        >
          <p>
            <ChevronUp />
          </p>
        </Button>
      </form>
      {isTyping && (
        <div className="typing-indicator">
          <span>Typing...</span>
        </div>
      )}
    </>
  );
};

export default SingleChat;
