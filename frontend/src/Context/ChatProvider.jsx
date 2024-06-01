import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Manage loading state
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          setLoggedUser(parsedUser);
          setIsLoading(false); // Set loading to false on successful fetch
        } else {
          history.push("/"); // Redirect if no user info found
        }
      } catch (error) {
        console.error("Failed to retrieve or parse user info:", error);
        history.push("/"); // Redirect on error
      }
    };

    fetchUserInfo();
  }, [history]);

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

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
        setIsLoading(false); // Always set loading to false
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
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
        isLoading, // Make isLoading available to consumers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatState = () => useContext(ChatContext);

export { ChatProvider, ChatState };
