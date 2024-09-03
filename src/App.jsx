import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

import MediaComponent from "@/pages";
import useHead from "@/hooks/useHead";
import NavBar from "@/components/NavBar";
import LoadingBar from "./components/LoadingBar";

const App = () => {
  useHead(""); // reset title if not available

  const { pathname } = useLocation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    console.log(navigation.state);
  }, [navigation]);

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="font-sans h-full w-full grid grid-rows-[1fr,max-content] lg:grid-rows-none lg:grid-cols-[max-content,1fr]">
        {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
        <NavBar />
      </div>
    </>
  );
};

export default App;
