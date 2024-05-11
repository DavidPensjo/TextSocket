import {useEffect} from "react";
import { useHistory } from "react-router-dom";
import LoginSignUpTabs from "@/components/HomePageComponents/LogInSignUpTabs";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="font-roboto flex justify-center pt-20">
      <LoginSignUpTabs />
    </div>
  );
};

export default HomePage;
