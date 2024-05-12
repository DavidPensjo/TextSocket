import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <div className="w-[600px] h-[640px]">
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      ></SingleChat>
    </div>
  );
};

export default ChatBox;
