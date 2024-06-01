export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender?._id === m.sender?._id &&
    m.sender?._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender?._id !== m.sender?._id &&
      m.sender?._id !== userId) ||
    (i === messages.length - 1 && m.sender?._id !== userId)
  )
    return 0;
  else return "auto";
};

export const getSender = (loggedUser, chat) => {
  let users = chat.users || [];

  if (users.length === 1) {
    return users[0]._id === loggedUser?._id ? "You" : users[0].userName;
  } else {
    const otherUser = users.find((user) => user._id !== loggedUser?._id);
    return otherUser ? otherUser.userName : "Unknown";
  }
};

export const getSenderFull = (loggedUser, chat) => {
  let users = chat.users || [];

  if (users.length === 1) {
    return users[0]._id === loggedUser?._id ? "You" : users[0];
  } else {
    const otherUser = users.find((user) => user._id !== loggedUser?._id);
    return otherUser || "Unknown";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    messages[i + 1].sender?._id !== m.sender?._id &&
    m.sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  const lastMessage = messages[messages.length - 1];
  return (
    i === messages.length - 1 &&
    lastMessage.sender?._id !== userId &&
    lastMessage.sender?._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender?._id === m.sender?._id;
};
