import { useEffect } from "react";

const usePreloadImage = (src) => {
  useEffect(() => {
    if (src) return;
    const image = new Image();
    image.src = src;
  }, [src]);
};

export default usePreloadImage;
