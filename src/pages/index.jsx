import { Link, useLocation } from "react-router-dom";
import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import { getMedia, listMedia } from "@/services/tmdb";
import { useEffect, useState, useCallback, useMemo } from "react";
import { QUERY_LIST } from "@/constants/lists";
import TheFooter from "@/components/TheFooter";
import AppScroller from "@/components/AppScroller";
import AppLoader from "@/components/AppLoader";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setLoadingState } from "@/features/loaderSlice";

const MediaComponent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState([]);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loader.loading);

  const type = pathname.includes("tv") ? "tv" : "movie";
  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  const getMediaList = async () => {
    dispatch(setLoadingState(true));
    try {
      const mediaList = await Promise.all(
        queries.map((query) => listMedia(query.type, query.query, 1)),
      );
      setMedia(mediaList.map((media) => [...media.results]));
    } catch (error) {
      console.error("Error fetching media list", error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  useEffect(() => {
    getMediaList();
  }, []);

  const getHeroMedia = async (id) => {
    const heroMedia = await getMedia(type, id);
    setItem(heroMedia);
  };
  useEffect(() => {
    if (media.length && media[0].length) {
      const id = media[0][0]?.id;
      getHeroMedia(id);
    }
  }, [media, isRoot]);

  return (
    <>
      <AppLoader />
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
