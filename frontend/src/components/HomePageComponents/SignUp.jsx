import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { toast } = useToast();
  const history = useHistory();

  const handleSignUp = async () => {
    if (!userName || !email || !password || !passwordConfirmation) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Please fill all of the fields to sign up.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (password !== passwordConfirmation) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Passwords do not match.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    // Normalize the email to lower case before submitting
    const normalizedEmail = email.toLowerCase();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { userName, email: normalizedEmail, password },
        config
      );
      toast({
        title: "Signed up successfully",
        description: "You have successfully signed up.",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: err.response.data.message || "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create a new account by entering fields below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="space-y-1">
            <Label>Username</Label>
            <Input onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Confirm password</Label>
            <PasswordInput
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp}>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
