import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

const UserListItem = ({ user, handleFunction, checked }) => {
  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    handleFunction(user);
  };

  return (
    <div onClick={() => handleFunction(user)} className="mt-2 cursor-pointer flex justify-between items-center p-2 bg-[#676773] rounded-xl">
      <div className="flex items-center">
        <Avatar className="mr-3">
          <AvatarImage src={user.picture || "defaultAvatar.webp"} />
          <AvatarFallback>{user.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-[#94A3B8]">{user.userName}</p>
          <p className="text-sm text-[#94A3B8]">{user.email}</p>
        </div>
      </div>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default UserListItem;
