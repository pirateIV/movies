import { useState } from "react";
import {
  Outlet,
  UNSAFE_ViewTransitionContext,
  useLocation,
  useNavigation,
} from "react-router-dom";

import MediaComponent from "@/pages";
import NavBar from "@/components/NavBar";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative font-sans h-full w-full">
      <div className="h-full w-full grid grid-rows-[1fr,max-content] lg:grid-rows-none lg:grid-cols-[max-content,1fr]">
        <title>React Movies</title>
        {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
        <NavBar />
      </div>
    </div>
  );
};

export default App;
