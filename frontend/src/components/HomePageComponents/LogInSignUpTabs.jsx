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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordInput } from "@/components/ui/password-input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function LoginRegisterTabs() {
  const [logInUserName, setLogInUserName] = useState("");
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const [registerUserName, setRegisterUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] =
    useState("");

  const { toast } = useToast();
  const history = useHistory();

  const handleSignUp = async () => {
    if (
      !registerUserName ||
      !registerEmail ||
      !registerPassword ||
      !registerPasswordConfirmation
    ) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Please fill all of the fields to sign up.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (registerPassword !== registerPasswordConfirmation) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: "Passwords do not match.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { registerUserName, registerEmail, registerPassword },
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
  const handleLogIn = async () => {};

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="logIn">Log in</TabsTrigger>
        <TabsTrigger value="signUp">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="logIn">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Enter your account details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Username</Label>
              <Input onChange={(e) => setLogInUserName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <PasswordInput
                id="password"
                value={logInPassword}
                onChange={(e) => setLogInPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Log in</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signUp">
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
              <Input
                onChange={(e) => setRegisterEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="space-y-1">
              <Label>Username</Label>
              <Input onChange={(e) => setRegisterUserName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <PasswordInput
                id="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirm password</Label>
              <PasswordInput
                id="password_confirmation"
                value={registerPasswordConfirmation}
                onChange={(e) =>
                  setRegisterPasswordConfirmation(e.target.value)
                }
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignUp}>Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default LoginRegisterTabs;
