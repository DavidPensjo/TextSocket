import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { UserMinus } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const UserListItem = ({
  user,
  handleFunction,
  checked,
  renderCheckbox,
  renderChatOptions,
  chatId,
  token,
  updateUsersList,
}) => {
  const { toast } = useToast();

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    handleFunction(user);
  };

  const removeUserFromChat = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.put(
        "/api/chat/groupremove",
        {
          chatId,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "User removed from chat.",
        });
        updateUsersList(user._id);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove user from the chat.",
      });
    }
  };

  return (
    <div
      onClick={renderCheckbox ? () => handleFunction(user) : undefined}
      className="mt-2 cursor-pointer flex justify-between items-center p-2 bg-[#676773] rounded-xl"
    >
      <div className="flex items-center">
        <Avatar className="mr-3">
          <AvatarImage src={user.picture || "defaultAvatar.webp"} />
          <AvatarFallback>{user.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-[#94A3B8]">
            {user.userName}
          </p>
          <p className="text-sm text-[#94A3B8]">{user.email}</p>
        </div>
      </div>
      {renderCheckbox && (
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      )}
      {renderChatOptions && (
        <a onClick={removeUserFromChat}>
          <UserMinus className="text-[#CA5E5E] h-[25px] w-[25px]" />
        </a>
      )}
    </div>
  );
};

export default UserListItem;
