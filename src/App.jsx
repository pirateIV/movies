import { Outlet, useLocation } from "react-router-dom";

import Root from "@/pages";
import NavBar from "@/components/NavBar";
import { twMerge } from "tailwind-merge";
import MediaComponent from "@/pages";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={twMerge([
        "font-sans h-full w-full grid grid-rows-[1fr,max-content]",
        "lg:grid-rows-none lg:grid-cols-[max-content,1fr]",
      ])}
    >
      <div
        id="app-scroller"
        className="lg:order-2 overflow-x-hidden overflow-y-auto"
      >
        <div>
          {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default App;
