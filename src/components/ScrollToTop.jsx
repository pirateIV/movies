import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("app-scroller").scrollTo(0, 0);
    console.log(document.body.scrollHeight);
  }, [pathname]);
};

export default ScrollToTop;
