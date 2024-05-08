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
