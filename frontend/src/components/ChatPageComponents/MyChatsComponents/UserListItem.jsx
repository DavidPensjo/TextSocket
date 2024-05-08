import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div onClick={handleFunction} className="cursor-pointer ">
      <div className="flex items-center space-x-4 h-[80px] w-[330px] bg-[#676773] rounded-xl">
        <Avatar className="mt-1.5 ml-3">
          <AvatarImage src={user.picture} />
          <AvatarFallback src="https://github.com/shadcn.png"></AvatarFallback>
        </Avatar>
        <div className="">
          <h1 className="text-lg font-semibold text-[#94A3B8]">
            {user.userName}
          </h1>
          <p className="text-base text-[#94A3B8]">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
