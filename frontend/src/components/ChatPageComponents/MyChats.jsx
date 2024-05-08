import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "./MyChatsComponents/ChatPreview";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NewChatDialog from "./MyChatsComponents/NewChatDialog";

const MyChats = () => {
  const { user } = ChatState();
  return (
    <div className="bg-[#494959] h-[760px] w-[380px] rounded-[8px] flex flex-col">
      <div className="flex w-[380px] gap-3 pt-4 pl-5">
        <div className="flex">
          <input
            className="w-[220px] h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px] pl-2 focus:outline-none"
            placeholder="Search..."
          ></input>
          <NewChatDialog/>
        </div>
        <Button className="w-[60px] bg-[#2B2B3C] border-[#5E6875] border-2 hover:bg-slate-600 active:bg-[#2B2B3C] focus:bg-[#2B2B3C] transition ease-out delay-150 ">
          <svg
            width="27"
            height="20"
            viewBox="0 0 27 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M21 19V17C20.9993 16.1137 20.7044 15.2528 20.1614 14.5523C19.6184 13.8519 18.8581 13.3516 18 13.13M15 1.13C15.8604 1.3503 16.623 1.8507 17.1676 2.55231C17.7122 3.25392 18.0078 4.11683 18.0078 5.005C18.0078 5.89317 17.7122 6.75608 17.1676 7.45769C16.623 8.1593 15.8604 8.6597 15 8.88M23 6.08333V11.9167M20.0833 9H25.9167M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
              stroke="#cfdbec"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </div>
      <div className="flex flex-col pt-8 items-center h-[610px]">
        <ScrollArea className="flex flex-col gap-5 w-[338px]">
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
          <ChatPreview />
          <Separator className="my-2.5 bg-[#494959]" />
        </ScrollArea>
      </div>
      <div className="pt-6 pl-3">
        <div className="flex flex-row w-[322px] h-[60px] rounded-[10px] items-center pl-2 underline">
          <Avatar className="cursor-pointer">
            <AvatarImage src="/pepe.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <a className="text-[#94A3B8] font-bold text-2xl pl-3 pt-1 cursor-pointer">
            OfficialDavve
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyChats;
