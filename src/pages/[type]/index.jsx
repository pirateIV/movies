import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMedia, listMedia } from "@/services/tmdb";
import HeroMedia from "@/components/media/Hero";
import { QUERY_LIST } from "@/constants/lists";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";

const Media = () => {
  const { pathname } = useLocation();
  const [media, setMedia] = useState(null);

  const type = pathname.includes("tv") ? "tv" : "movie";

  useEffect(() => {
    async function getMediaItems() {
      const mediaList = QUERY_LIST.map(
        async (query) => await Promise.all(listMedia(type, query.query, 1)),
      );
      setMedia(mediaList);
    }
    getMediaItems();
  }, []);

  console.log(media);

  console.log(type);
  console.log(QUERY_LIST[type]);

  return (
    <>
      <HeroMedia item={null} />
      <CarouselAutoQuery
        media={media}
        queries={QUERY_LIST[type]}
      ></CarouselAutoQuery>
    </>
  );
};

export default Media;
