import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHistory } from "react-router-dom";
import { ChatState } from "@/Context/ChatProvider";
import ProfileDialog from "./ProfileDialog";

const LoggedInUser = () => {
  const { setUser, setLoggedUser, user } = ChatState();
  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");

    setUser(null);
    setLoggedUser(null);

    history.push("/");
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <a className="text-[#94A3B8] font-bold text-2xl pl-3 pt-1 cursor-pointer underline focus:outline-none">
              {user?.userName || "Guest"}
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#494959] border-2 border-[#5E6875] text-[#94A3B8]">
            <DialogTrigger asChild>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ProfileDialog></ProfileDialog>
      </Dialog>
    </>
  );
};

export default LoggedInUser;
