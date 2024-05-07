import React from "react";
import { ChatState } from "@/Context/ChatProvider";
import ChatPreview from "./MyChatsComponents/ChatPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const MyChats = () => {
  const { user } = ChatState();
  return (
    <div className="bg-[#494959] h-[760px] w-[380px] rounded-[8px] flex flex-col">
      <div className="flex w-[380px] justify-center gap-4 pt-4">
        <div className="flex ">
          <input
            className="w-[150px] h-[40px] bg-[#2B2B3C] border-[#2B2B3C] text-[#CFDBEC] rounded-l-[10px]"
            placeholder="Search..."
          ></input>
          <button className="w-[40px] h-[40px] bg-[#2B2B3C] border-[#5E6875] border-2 text-[#CFDBEC] rounded-r-[10px]">aa</button>
        </div>
        <Button className="w-[120px] bg-[#2B2B3C]">+ Group Chat</Button>
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
      <div className="flex flex-row pt-6 pl-6">
        <Avatar className="cursor-pointer">
          <AvatarImage src="/pepe.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <a className="text-[#94A3B8] font-bold text-2xl pl-3 pt-1 underline cursor-pointer">
          OfficialDavve
        </a>
      </div>
    </div>
  );
};

export default MyChats;
