import { useEffect, useState } from "react";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";

const useMediaData = (isRoot, pathname) => {
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
  return { item, media, type, queries };
};

export default useMediaData;
