import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginSignUpTabs from "@/components/HomePageComponents/LogInSignUpTabs";
import { EvervaultCard } from "@/components/ui/evervault-card";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="font-roboto flex bg-black h-screen w-screen justify-center items-center relative overflow-hidden">
      <div className="bg-black w-screen h-screen grid grid-cols-9 grid-rows-5">
        <div className="col-span-2 row-span-2 row-start-1 flex justify-center items-center">
          <EvervaultCard className="h-[300px] w-[300px] 2xl:h-[400px] 2xl:w-[400px] xxl:h-[500px] xxl:w-[500px]" />
        </div>
        <div className="text-3xl col-span-1 row-span-1 col-start-3 row-start-3 2xl:ml-40 w-[300px] 2xl:h-[350px] 2xl:w-[350px]">
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
        <h1 className="col-span-5 text-7xl font-mono text-white col-start-3 row-start-1 mt-24 pl-36">
          TEXT SOCKET
        </h1>
        <div className="2xl:pl-20 pl-40 row-span-2 bg-black col-start-6 row-start-3">
          <div className="bg-black flex flex-col justify-center items-center">
            <LoginSignUpTabs className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
