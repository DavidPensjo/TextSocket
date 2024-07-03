import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          setLoggedUser(parsedUser);
          setIsLoading(false);
        } else {
          history.push("/");
        }
      } catch (error) {
        console.error("Failed to retrieve or parse user info:", error);
        history.push("/");
      }
    };

    fetchUserInfo();
  }, [history]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo && isMounted) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          setLoggedUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to retrieve or parse user info:", error);
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        loggedUser,
        setLoggedUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatState = () => useContext(ChatContext);

export { ChatProvider, ChatState };
