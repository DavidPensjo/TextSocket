import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginSignUpTabs from "@/components/HomePageComponents/LogInSignUpTabs";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="font-roboto flex bg-gray-900 h-screen w-screen">
      <div className="flex flex-col justify-center items-center w-full pb-28">
        <h1 className=" text-8xl font-mono pb-10 text-white">SHAD CHAT</h1>
        <LoginSignUpTabs className="" />
      </div>
    </div>
  );
};

export default HomePage;
