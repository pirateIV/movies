import { useEffect, useState } from "react";
import { listMedia } from "services/tmdbAPI";
import { QUERY_LIST } from "constants/lists";
import MediaList from "components/media/List";

const queries = [QUERY_LIST.movie[1], QUERY_LIST.movie[2], QUERY_LIST.movie[3]];

const Movies = () => {
  const [movieLists, setMovieLists] = useState({
    top_rated: [],
    upcoming: [],
    now_playing: [],
  });

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [topRated, upcoming, nowPlaying] = await Promise.all([
          listMedia("movie", queries[0]?.query),
          listMedia("movie", queries[1]?.query),
          listMedia("movie", queries[2]?.query),
        ]);
        setMovieLists({
          top_rated: topRated?.data?.results || [],
          upcoming: upcoming?.data?.results || [],
          now_playing: nowPlaying?.data?.results || [],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return <MediaList mediaItems={movieLists} mediaList={queries} />;
};

export default Movies;
