import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";
import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";

const queries = [QUERY_LIST.movie[0], QUERY_LIST.tv[0]];

const Root = () => {
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState({ movie: [], tv: [] });

  useEffect(() => {
    async function getMediaDetails() {
      const [movies, tv] = await Promise.all([
        listMedia("movie", queries[0].query, 1),
        listMedia("tv", queries[1].query, 1),
      ]);

      const movies_res = movies?.data?.results;
      const tv_res = tv?.data?.results;

      setMedia({ movie: movies_res, tv: tv_res });

      if (movies_res.length) {
        const item = await getMedia("movie", movies_res[0]?.id);
        setItem(item?.data);
      }
    }

    getMediaDetails();
  }, []);

  console.log(item);

  return (
    <>
      <HeroMedia item={item} />
      <CarouselAutoQuery media={media} queries={queries} />
    </>
  );
};

export default Root;
