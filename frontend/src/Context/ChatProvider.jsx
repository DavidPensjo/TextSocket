import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Assuming you're using react-router for navigation

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null); // manages the logged-in user's state
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null); // Additional state for loggedUser
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
          setLoggedUser(parsedUser); // Assuming loggedUser mirrors the 'user'
        } else {
          history.push("/login"); // Redirect if no user info found
        }
      } catch (error) {
        console.error("Failed to retrieve or parse user info:", error);
        history.push("/login"); // Redirect on error
      }
    };

    fetchUserInfo();
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        loggedUser, // Making loggedUser available throughout the application
        selectedChat,
        setSelectedChat,
        chats,
        setChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatState = () => useContext(ChatContext);

export { ChatProvider, ChatState };
