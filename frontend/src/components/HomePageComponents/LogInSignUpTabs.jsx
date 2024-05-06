import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "./SignUp";
import Login from "./Login";

function LoginRegisterTabs() {

  return (
    <Tabs defaultValue="logIn" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="logIn">Log in</TabsTrigger>
        <TabsTrigger value="signUp">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="logIn">
        <Login />
      </TabsContent>
      <TabsContent value="signUp">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
}

export default LoginRegisterTabs;
