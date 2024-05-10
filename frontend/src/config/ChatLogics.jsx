export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const getSender = (loggedUser, chat) => {
  let users = chat.users;

  if (users.length === 1) {
    if (users[0]._id === loggedUser._id) {
      return "You";
    } else {
      return users[0].userName;
    }
  } else if (users.length > 1) {
    for (let user of users) {
      if (user._id !== loggedUser._id) {
        return user.userName;
      }
    }
  }
  return "Unknown";
};

export const getSenderFull = (loggedUser, chat) => {
  let users = chat.users;

  if (users.length === 1) {
    if (users[0]._id === loggedUser._id) {
      return "You";
    } else {
      return users[0].userName;
    }
  } else if (users.length > 1) {
    for (let user of users) {
      if (user._id !== loggedUser._id) {
        return user;
      }
    }
  }
  return "Unknown";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
