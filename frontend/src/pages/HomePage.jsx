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
    <div className="font-roboto flex bg-black h-screen w-screen">
      <div className="flex flex-col justify-center items-center w-full pb-28">
        <h1 className=" text-7xl font-mono pb-10 text-white">TEXT SOCKET</h1>
        <LoginSignUpTabs className="" />
      </div>
      <img className="w-[800px] h-[800px]" src={TextSocketHome} />
    </div>
  );
};

export default HomePage;
