import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";
import TheFooter from "@/components/TheFooter";
import AppScroller from "@/components/AppScroller";
import { useAppDispatch } from "@/app/hooks";
import { setLoadingState } from "@/features/loaderSlice";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState([]);

  const dispatch = useAppDispatch();

  const type = pathname.includes("tv") ? "tv" : "movie";
  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  const getHeroMedia = async (id) => {
    if (!id) return;
    try {
      const heroMedia = await getMedia(type, id);
      setItem(heroMedia);
    } catch (error) {
      console.error("Error fetching hero media", error);
    }
  };

  const getMediaList = async () => {
    // dispatch(setLoadingState(true));
    try {
      const mediaList = await Promise.all(
        queries.map((query) => listMedia(query.type, query.query, 1)),
      );
      const mediaResults = mediaList.map((media) => [...media.results]);
      setMedia(mediaResults);

      const firstMediaId = mediaResults?.[0]?.[0]?.id;
      if (firstMediaId) {
        await getHeroMedia(firstMediaId);
      }
    } catch (error) {
      console.error("Error fetching media list", error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  useEffect(() => {
    getMediaList();
  }, [isRoot]);

  return (
    <>
      {/* <AppLoader /> */}
      <AppScroller>
        <Link
          to={`/${type}/${item?.id || ""}`}
          className={!item?.id ? "hover:cursor-not-allowed" : ""}
          onClick={(e) => !item?.id && e.preventDefault()}
        >
          <HeroMedia type={type} item={item} />
        </Link>
        <CarouselAutoQuery media={media} queries={queries} />
        <TheFooter />
      </AppScroller>
    </>
  );
};

export default MediaComponent;
