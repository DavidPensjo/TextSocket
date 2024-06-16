import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginSignUpTabs from "@/components/HomePageComponents/LogInSignUpTabs";
import TextSocketHome from "@/assets/TextSocketLogoBlack.png";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="font-roboto flex bg-black h-screen w-screen justify-center items-center relative overflow-hidden">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center relative z-10">
          <h1 className="text-7xl font-mono pb-10 text-white">TEXT SOCKET</h1>
          <LoginSignUpTabs className="" />
        </div>
        <div
          className="absolute right-0 flex items-center justify-center h-full"
        >
          <img
            src={TextSocketHome}
            alt="Background"
            className="object-contain h-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
