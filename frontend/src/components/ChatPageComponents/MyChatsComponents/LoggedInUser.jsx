import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHistory } from "react-router-dom";
import { ChatState } from "@/Context/ChatProvider";

const LoggedInUser = () => {
  const { setUser, setLoggedUser, user } = ChatState(); // Assuming these setters are available in your context
  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");

    setUser(null);
    setLoggedUser(null);

    history.push("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <a className="text-[#94A3B8] font-bold text-2xl pl-3 pt-1 cursor-pointer underline focus:outline-none">
            {user?.userName || "Guest"}
          </a>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#494959] border-2 border-[#5E6875] text-[#94A3B8]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#5E6875]" />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LoggedInUser;
