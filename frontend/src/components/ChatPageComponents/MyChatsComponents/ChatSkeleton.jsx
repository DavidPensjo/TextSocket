import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <>
      <div className="bg-[#494959] h-[80px] w-[560px] rounded-[8px]">
        <Skeleton className="flex flex-row items-center h-[80px] pl-5" />
      </div>
    </>
  );
};

export default ChatSkeleton;
