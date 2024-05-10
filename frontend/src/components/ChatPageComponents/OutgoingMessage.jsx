
const ChatMessages = () => {
  return (
    <div className="w-[550px] h-[600px] rounded flex ">
      <div className="self-end pb-5">
        <div className="flex gap-2">
          <div className="self-end w-[500px] h-[40px] bg-[#494959] border-[#2B2B3C] text-[#CFDBEC] rounded-[10px] pl-2 focus:outline-none flex items-center">
            <p>Hey, how are you?</p>
          </div>
        </div>
        <p className="text-slate-300">07:45</p>
      </div>
    </div>
  );
};

export default ChatMessages;
