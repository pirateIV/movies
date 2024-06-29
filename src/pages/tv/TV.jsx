import { useEffect, useState } from "react";
import { QUERY_LIST } from "constants/lists";
import MediaList from "components/media/List";
import { listMedia } from "services/tmdbAPI";

const queries = [QUERY_LIST.tv[1], QUERY_LIST.tv[2]];

const TV = () => {
  const [tvLists, setTvLists] = useState({
    top_rated: [],
    airing_today: [],
  });

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
  return <MediaList mediaItems={tvLists} mediaList={queries} />;
};

export default TV;
