import { useEffect, useState } from "react";
import { getMedia } from "@/services/tmdb";
import { useLocation, useParams } from "react-router-dom";
import HeroMedia from "@/components/media/Hero";
import AppScroller from "@/components/AppScroller";

const MediaType = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);

  const type = pathname.includes("tv") ? "tv" : "movie";

  useEffect(() => {
    async function getMediaItem() {
      const heroMedia = await getMedia(type, id);
      setItem(heroMedia?.data);
    }
    getMediaItem();
  }, []);

  return (
    <>
      <AppScroller>
        <HeroMedia item={item} />
      </AppScroller>
    </>
  );
};

export default MediaType;
