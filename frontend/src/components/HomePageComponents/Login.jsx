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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: "Please fill all of the fields to log in.",
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
        "/api/user/login",
        { email: normalizedEmail, password },
        config
      );
      toast({
        title: "Logged in successfully",
        description: "You have successfully logged in.",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: err.response.data.message || "Something went wrong.",
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Enter your account details below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>Log in</Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
