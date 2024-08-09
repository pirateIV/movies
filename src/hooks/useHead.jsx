import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHead = (title) => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title ? `${title} · React Movies` : "React Movies";
  }, [title, pathname]);
};

export default useHead;
