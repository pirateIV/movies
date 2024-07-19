// import { useEffect, useState } from "react";
// import { getMedia, listMedia } from "@/services/tmdb";
// import { QUERY_LIST } from "@/constants/lists";
// import HeroMedia from "@/components/media/Hero";
// import CarouselAutoQuery from "@/components/carousel/AutoQuery";

import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import HeroMedia from "@/components/media/Hero";
import { QUERY_LIST } from "@/constants/lists";
import { getMedia, listMedia } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();

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

  console.log(item);

  return (
    <>
      <HeroMedia type={type} item={item} />
      <CarouselAutoQuery media={media} queries={queries} />
    </>
  );
};

export default MediaComponent;
