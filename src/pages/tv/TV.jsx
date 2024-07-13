import { useEffect, useState } from "react";
import { QUERY_LIST } from "constants/lists";
import MediaList from "components/media/List";
import { listMedia } from "services/tmdbAPI";
import HeroMedia from "components/media/HeroMedia";
import { useSelector } from "react-redux";

const queries = [QUERY_LIST.tv[1], QUERY_LIST.tv[2]];

const TV = () => {
  const [tvLists, setTvLists] = useState({
    top_rated: [],
    airing_today: [],
  });
  const { heroMedia } = useSelector((state) => state.media);

  useEffect(() => {
    const getTVShows = async () => {
      try {
        const [topRated, airingToday] = await Promise.all([
          listMedia("tv", queries[0]?.query),
          listMedia("tv", queries[1]?.query),
        ]);
        setTvLists({
          top_rated: topRated?.data?.results || [],
          airing_today: airingToday?.data?.results || [],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTVShows();
  }, []);
  return (
    <>
      <HeroMedia type={"tv"} item={heroMedia} />
      <MediaList mediaItems={tvLists} mediaList={queries} />
    </>
  );
};

export default TV;
