import { Link, useLocation } from "react-router-dom";
import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import { getMedia, listMedia } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { QUERY_LIST } from "@/constants/lists";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  // const { item, type, media, queries } = useMediaData(isRoot, pathname);

  const [item, setItem] = useState(null);
  const [media, setMedia] = useState([]);

  const type = pathname.includes("tv") ? "tv" : "movie";

  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  useEffect(() => {
    async function getMediaList() {
      try {
        const mediaList = await Promise.all(
          queries.map((query) => listMedia(query.type, query.query, 1)),
        );
        setMedia(mediaList?.map((media) => [...media?.data?.results]));
      } catch (error) {
        console.error("Error fetching media", error);
      }
    }
    getMediaList();
  }, [queries]);

  useEffect(() => {
    async function getHeroMedia(id) {
      try {
        if (media.length && media[0].length) {
          const heroMedia = await getMedia(type, id);
          setItem(heroMedia?.data);
        }
      } catch (error) {
        console.error("Error fetching media", error);
      }
    }

    if (media.length && media[0].length) {
      getHeroMedia(media[0][0]?.id);
    }
  }, [media, isRoot]);

  let link = undefined;

  return (
    <>
      <Link
        to={`/${type}/${item?.id || ""}`}
        className={!item?.id ? "hover:cursor-not-allowed" : ""}
        onClick={(e) => !item?.id && e.preventDefault()}
      >
        <HeroMedia type={type} item={item} />
      </Link>
      <CarouselAutoQuery media={media} queries={queries} />
    </>
  );
};

export default MediaComponent;
