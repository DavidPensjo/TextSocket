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
    <div className="font-roboto flex bg-black h-screen w-screen justify-center items-center relative">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl font-mono pb-10 text-white">TEXT SOCKET</h1>
        <LoginSignUpTabs className="" />
      </div>
      <img
        className="absolute right-0 w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[750px] xl:h-[700px]"
        src={TextSocketHome}
      />
    </div>
  );
};

export default HomePage;
