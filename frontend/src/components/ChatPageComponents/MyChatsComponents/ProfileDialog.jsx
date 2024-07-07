import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChatState } from "@/Context/ChatProvider";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function ProfileDialog() {
  const { user, setUser, loggedUser } = ChatState();
  const { toast } = useToast();

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.put(`/api/user/profilepicture`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(data);
      toast({
        title: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile picture.",
      });
    }
  };

  return (
    <>
      <DialogContent className="bg-[#494959] sm:max-w-[425px] sm:min-w-[425px] border-[#494959] overflow-y-auto max-h-[800px]">
        <DialogHeader>
          <div className="text-[#CFDBEC] pt-4 flex flex-row">
            <div className="relative inline-block h-[100px] w-[100px] mr-4 border-2 rounded-full border-[#2b2b3c]">
              <label className="cursor-pointer h-full w-full block">
                <img
                  className="h-full w-full rounded-full transition-transform duration-300 transform hover:scale-110 hover:opacity-80"
                  src={user.picture}
                  alt="profile picture"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePictureChange}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <span className="text-white">Change Icon</span>
                </div>
              </label>
            </div>
            <Label className="text-[#94a3b8] pt-14 text-3xl font-bold underline">
              {user.userName}
            </Label>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}

export default ProfileDialog;
