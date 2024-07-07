import { useState, useEffect } from "react";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const history = useHistory();
  const { setUser, setLoggedUser, loggedUser, user } = ChatState();

  useEffect(() => {
    if (user && loggedUser) {
      history.push("/chats");
    }
  }, [user, loggedUser, history]);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: "Please fill all fields.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const normalizedEmail = email.toLowerCase();
      const { data } = await axios.post(
        "/api/user/login",
        { email: normalizedEmail, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoggedUser(data);

      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: err.response?.data.message || "An error occurred.",
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Enter your account details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Log in</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Login;
