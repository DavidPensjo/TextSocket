import SingleChat from "./ChatBoxComponents/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <div className="h-screen lg:bg-inherit bg-[#2b2b3c] flex flex-col">
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      ></SingleChat>
    </div>
  );
};

export default ChatBox;
