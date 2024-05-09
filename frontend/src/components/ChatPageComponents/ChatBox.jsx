import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
const ChatBox = () => {
  return (
    <div className="w-[600px] h-[40px] flex gap-3">
      <input
        className="w-[500px] h-[40px] bg-[#494959] border-[#2B2B3C] text-[#CFDBEC] rounded-[10px] pl-2 focus:outline-none"
        placeholder="Message..."
      ></input>
      <Button className="w-[40px] h-[40px] bg-indigo-600">
        <p>
          <ChevronUp />{" "}
        </p>
      </Button>
    </div>
  );
};

export default ChatBox;
