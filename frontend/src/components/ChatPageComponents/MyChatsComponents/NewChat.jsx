import { SmilePlus } from "lucide-react";
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
          <button className="w-[40px] h-[40px] hover:bg-slate-600 active:bg-[#2B2B3C] focus:bg-[#2B2B3C] transition ease-out delay-150  bg-[#2B2B3C] border-[#5E6875] border-2 text-[#CFDBEC] rounded-r-[10px] flex justify-center items-center">
            <SmilePlus />
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
