import { useEffect, useRef, useState } from "react";
import { listMedia } from "@/services/tmdb";
import AppScroller from "@/components/AppScroller";
import { useLocation, useParams } from "react-router-dom";
import MediaAutoLoadGrid from "@/components/media/AutoLoadGrid";

const MediaQuery = () => {
  const { query } = useParams();
  const { pathname } = useLocation();

  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollerref = useRef(null);

  const type = pathname.includes("tv") ? "tv" : "movie";

  const fetchMediaPages = async (pageNum) => {
    setLoading(true);
    try {
      const res = await listMedia(type, query, pageNum);
      const data = await res.results;

      if (data?.length === 0) {
        setHasMore(false); // No more data to fetch
      } else {
        setMedia((prevMedia) => [...prevMedia, ...data]);
      }
    } catch (error) {
      console.log("Error occured fetching media", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchMediaPages(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore || !scrollerref.current) return;

      const scroller = scrollerref.current;
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight;
      const clientHeight = scroller.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const scroller = scrollerref.current;
    if (scroller) {
      scroller.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scroller) {
        scroller.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMore, scrollerref]);

  return (
    <AppScroller ref={scrollerref}>
      <MediaAutoLoadGrid type={type} media={media}>
        <span className="capitalize">{query.replace(/_/g, " ")}</span>
        <span>{pathname.includes("tv") ? "TV Shows" : "Movies"}</span>
      </MediaAutoLoadGrid>
      {loading && (
        <div
          animate-spin=""
          i-carbon:circle-dash=""
          className="m-auto text-5xl"
        ></div>
      )}
    </AppScroller>
  );
};

export default MediaQuery;
