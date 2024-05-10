import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
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
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //NOTIFICATION
      } else {
        setMessages([...messages, newMessageRecieved]);
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
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
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
        <p>Loading...</p>
      ) : (
        <div>
          <ScrollableChat
            className="flex flex-col"
            style={{ scrollbarWidth: "none" }}
            messages={messages}
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
