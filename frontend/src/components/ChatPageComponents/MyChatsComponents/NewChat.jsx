import { MessageSquarePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NewChat = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-[50px] h-[40px] hover:bg-slate-600 active:bg-[#2B2B3C] focus:bg-[#2B2B3C] transition ease-out delay-150  bg-[#2B2B3C] border-[#5E6875] border-2 text-[#CFDBEC] flex justify-center items-center rounded-r-lg">
            <MessageSquarePlus className="" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New chat!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewChat;
