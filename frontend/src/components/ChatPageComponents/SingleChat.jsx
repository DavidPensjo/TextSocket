import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import ChatSkeleton from "./MyChatsComponents/ChatSkeleton";

// Use the environment variable for the endpoint
const ENDPOINT = import.meta.env.VITE_API_URL;
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, user } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
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

      setMessages(data || []); // Ensure data is an array
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      path: "/socket.io", // Ensure this matches your server's path
    });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true)); // Corrected to 'connected'
  }, [user]);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // Corrected to 'received'
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // NOTIFICATION
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
  });

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          `${ENDPOINT}/api/message`,
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        socket.emit("new message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
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
            messages={Array.isArray(messages) ? messages : []} // Ensure messages is an array
          ></ScrollableChat>
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
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          onClick={handleSendMessage}
          className="w-[40px] h-[40px] bg-indigo-600"
        >
          <p>
            <ChevronUp />
          </p>
        </Button>
      </form>
    </>
  );
};

export default SingleChat;
