import { Link, useLocation } from "react-router-dom";
import HeroMedia from "@/components/media/Hero";
import useMediaData from "@/hooks/useMediaData";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  const { item, type, media, queries } = useMediaData(isRoot, pathname);

  return (
    <>
      <Link
        to={`/${type}/${item?.id || ""}`}
        className={item?.id === undefined ? "hover:cursor-not-allowed" : ""}
      >
        <HeroMedia type={type} item={item} />
      </Link>
      <CarouselAutoQuery media={media} queries={queries} />
    </>
  );
};

export default MediaComponent;
