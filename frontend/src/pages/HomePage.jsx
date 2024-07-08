import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginSignUpTabs from "@/components/HomePageComponents/LogInSignUpTabs";
import { EvervaultCard } from "@/components/ui/evervault-card";
import TextSocketHome from "@/assets/TextSocketLogoBlack.png";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="font-roboto flex bg-black h-dvh w-screen justify-center items-center relative overflow-hidden">
      <div className="bg-black w-screen h-dvh lg:grid lg:grid-cols-9 lg:grid-rows-5 flex flex-col gap-10 lg:gap-0 justify-center">
        <div className="hidden lg:flex col-span-2 row-span-2 row-start-1 justify-center items-center">
          <EvervaultCard className="h-[300px] w-[300px] 2xl:h-[400px] 2xl:w-[400px] xxl:h-[500px] xxl:w-[500px]" />
        </div>
        <div className="flex">
          <h1 className="lg:col-span-5 text-7xl font-mono text-white lg:col-start-3 lg:row-start-1 lg:mt-24 lg:pl-36">
            TEXT SOCKET
          </h1>
          <div>
            <img className="w-56" src={TextSocketHome} alt="TextSocketLogo" />
          </div>
        </div>

        <div className="2xl:pl-20 lg:pl-40 lg:row-span-2 bg-black lg:col-start-6 lg:row-start-3 ">
          <div className="bg-black flex flex-col justify-center items-center">
            <LoginSignUpTabs className="" />
          </div>
        </div>
        <div className="hidden lg:block text-2xl lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:row-start-3 2xl:ml-40 w-[300px] 2xl:h-[350px] 2xl:w-[350px]">
          <p className="text-white">
            This page hosts a real-time chat application named TEXT SOCKET
          </p>
          <ul className="text-white list-disc pl-8 pt-3 text-base">
            <li>React</li>
            <li>Tailwind CSS</li>
            <li>MongoDB</li>
            <li>AWS S3</li>
            <li>Node.js and Express</li>
            <li>JWT</li>
            <li>Socket.io</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
