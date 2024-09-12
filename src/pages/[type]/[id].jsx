import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMedia, getRecommendations } from "@/services/tmdb";
import HeroMedia from "@/components/media/Hero";
import TheFooter from "@/components/TheFooter";
import AppScroller from "@/components/AppScroller";
import CarouselBase from "@/components/carousel/Base";
import MediaCard from "@/components/media/Card";
import Overview from "@/components/media/Overview";
import Photos from "@/components/media/Photos";
import Videos from "@/components/media/Videos";

const MediaType = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);
  const [similar, setSimilar] = useState([]);

  const type = pathname.includes("tv") ? "tv" : "movie";
  const [activeTab, setActiveTab] = useState("overview");

  const scrollerRef = useRef(null);

  useEffect(() => {
    async function getMediaItem() {
      const heroMedia = await getMedia(type, id);
      setItem(heroMedia);
    }
    getMediaItem();

    async function getSimilar() {
      const similarMedia = await getRecommendations(type, id, 1);
      setSimilar(similarMedia);
    }
    getSimilar();

    scrollerRef.current.scrollTo({ top: 0 });
  }, [id]);

  return (
    <>
      <AppScroller ref={scrollerRef}>
        <title>{`${item ? item?.title || item?.name : "React Movies"} · React Movies`}</title>

        <HeroMedia item={item} />

        <header className="flex items-center justify-center gap-8 py-6">
          <button
            n-tab=""
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "n-tab-active" : ""}
          >
            Overview
          </button>
          <button
            n-tab=""
            onClick={() => setActiveTab("videos")}
            className={activeTab === "videos" ? "n-tab-active" : ""}
          >
            Videos
          </button>
          <button
            n-tab=""
            onClick={() => setActiveTab("photos")}
            className={activeTab === "photos" ? "n-tab-active" : ""}
          >
            Photos
          </button>
        </header>

        {activeTab === "overview" && <Overview item={item} />}
        {activeTab === "videos" && <Videos item={item} />}
        {activeTab === "photos" && <Photos item={item} />}

        <CarouselBase query={{ title: "More like this" }}>
          {similar?.map((item, i) => (
            <MediaCard key={i} item={item} query={{ type }} />
          ))}
        </CarouselBase>

        <TheFooter />
      </AppScroller>
    </>
  );
};

export default MediaType;
