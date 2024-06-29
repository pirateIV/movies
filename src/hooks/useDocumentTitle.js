import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} · React Movies`;
  }, [title]);
};

export default useDocumentTitle;
