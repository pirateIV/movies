import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

import MediaComponent from "@/pages";
import useHead from "@/hooks/useHead";
import NavBar from "@/components/NavBar";
import AppLoader from "@/components/AppLoader";

const App = () => {
  useHead(""); // reset title if not available

  const { pathname } = useLocation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative font-sans h-full w-full">
      <div className="h-full w-full grid grid-rows-[1fr,max-content] lg:grid-rows-none lg:grid-cols-[max-content,1fr]">
        {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
        <NavBar />
      </div>
    </div>
  );
};

export default App;
