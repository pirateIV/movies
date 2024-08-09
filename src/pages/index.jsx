import { Link, useLocation } from "react-router-dom";
import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import { getMedia, listMedia } from "@/services/tmdb";
import { useEffect, useState, useCallback, useMemo } from "react";
import { QUERY_LIST } from "@/constants/lists";
import TheFooter from "@/components/TheFooter";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState([]);

  const type = useMemo(
    () => (pathname.includes("tv") ? "tv" : "movie"),
    [pathname],
  );

  const queries = useMemo(() => {
    return isRoot ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]] : QUERY_LIST[type];
  }, [isRoot, type]);

  const getMediaList = useCallback(async () => {
    const mediaList = await Promise.all(
      queries.map((query) => listMedia(query.type, query.query, 1)),
    );
    setMedia(mediaList.map((media) => [...media.data.results]));
  }, [queries]);

  useEffect(() => {
    getMediaList();
  }, [getMediaList]);

  const getHeroMedia = useCallback(
    async (id) => {
      if (media.length && media[0].length) {
        const heroMedia = await getMedia(type, id);
        setItem(heroMedia.data);
      }
    },
    [media, type],
  );

  useEffect(() => {
    if (media.length && media[0].length) {
      const id = media[0][0]?.id;
      getHeroMedia(id);
    }
  }, [media, isRoot, getHeroMedia]);

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
      <TheFooter />
    </>
  );
};

export default MediaComponent;
