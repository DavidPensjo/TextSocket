import React, { useState, useEffect } from "react";
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
import { ChatState } from "@/Context/ChatProvider";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setUser, user } = ChatState();
  const { toast } = useToast();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/chats");
    }
  }, [user, history]);

  const handleSignUp = async () => {
    if (!userName || !email || !password || !passwordConfirmation) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Please fill all fields to sign up.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (password !== passwordConfirmation) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Passwords do not match.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

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
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      toast({
        title: "Signup Successful",
        description: "You have been signed up successfully.",
      });
      history.push("/chats");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: err.response?.data.message || "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="space-y-1">
            <Label>Username</Label>
            <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1">
            <Label>Confirm Password</Label>
            <PasswordInput
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
