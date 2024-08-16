import { Outlet, useLocation } from "react-router-dom";
import MediaComponent from "@/pages";
import useHead from "./hooks/useHead";
import NavBar from "@/components/NavBar";

const App = () => {
  useHead(""); // reset title if not available

  const { pathname } = useLocation();

  return (
    <div className="font-sans h-full w-full grid grid-rows-[1fr,max-content] lg:grid-rows-none lg:grid-cols-[max-content,1fr]">
      {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
      <NavBar />
    </div>
  );
};

export default App;
