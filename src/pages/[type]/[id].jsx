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
    let isCurrent = true;

    async function getMediaItem() {
      try {
        const heroMedia = await getMedia(type, id);
        if (isCurrent) setItem(heroMedia);
      } catch (err) {
        console.error("Failed to fetch media item", err);
      }
    }
    getMediaItem();

    async function getSimilar() {
      try {
        const similarMedia = await getRecommendations(type, id, 1);
        if (isCurrent) setSimilar(similarMedia || []);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    }
    getSimilar();

    scrollerRef.current?.scrollTo({ top: 0 });

    return () => {
      isCurrent = false;
    };
  }, [id, type]);

  const handleChangeTab = (current) => {
    setActiveTab(current);
  };

  return (
    <>
      <AppScroller ref={scrollerRef}>
        <title>{`${item ? item?.title || item?.name : "React Movies"} · React Movies`}</title>

        <HeroMedia item={item} type={type} />

        <header className="flex items-center justify-center gap-8 py-6">
          <button
            n-tab=""
            onClick={() => handleChangeTab("overview")}
            className={activeTab === "overview" ? "n-tab-active" : ""}
            style={{ viewTransitionName: "tab-1" }}
          >
            Overview
          </button>
          <button
            n-tab=""
            onClick={() => handleChangeTab("videos")}
            className={activeTab === "videos" ? "n-tab-active" : ""}
            style={{ viewTransitionName: "tab-2" }}
          >
            Videos
          </button>
          <button
            n-tab=""
            onClick={() => handleChangeTab("photos")}
            className={activeTab === "photos" ? "n-tab-active" : ""}
            style={{ viewTransitionName: "tab-3" }}
          >
            Photos
          </button>
        </header>

        {activeTab === "overview" && <Overview item={item} />}
        {activeTab === "videos" && <Videos item={item} />}
        {activeTab === "photos" && <Photos item={item} />}

        <CarouselBase query={{ title: "More like this", type }}>
          {similar?.map((simItem, i) => (
            <MediaCard key={simItem.id || i} item={simItem} query={{ type }} />
          ))}
        </CarouselBase>

        <TheFooter />
      </AppScroller>
    </>
  );
};

export default MediaType;
