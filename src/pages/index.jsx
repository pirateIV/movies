import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HeroMedia from "@/components/media/Hero";
import CarouselAutoQuery from "@/components/carousel/AutoQuery";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";
import TheFooter from "@/components/TheFooter";
import AppScroller from "@/components/AppScroller";
import { useAppDispatch } from "@/app/hooks";
import { setLoadingState } from "@/features/loaderSlice";
import { DialogProvider, useDialog } from "@/context/DialogContext";

const MediaContent = ({ isRoot = false }) => {
  const { pathname } = useLocation();
  const [item, setItem] = useState(null);
  const [media, setMedia] = useState([]);
  const modalRef = useRef();
  const { isTrailerOpen, selectedMedia, closeTrailerDialog } = useDialog();

  const dispatch = useAppDispatch();

  const type = pathname.includes("tv") ? "tv" : "movie";
  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  const getHeroMedia = async (id) => {
    if (!id) return;
    try {
      const heroMedia = await getMedia(type, id);
      setItem(heroMedia);
    } catch (error) {
      console.error("Error fetching hero media", error);
    }
  };

  const getMediaList = async () => {
    // dispatch(setLoadingState(true));
    try {
      const mediaList = await Promise.all(
        queries.map((query) => listMedia(query.type, query.query, 1)),
      );
      const mediaResults = mediaList.map((media) => [...media.results]);
      setMedia(mediaResults);

      const firstMediaId = mediaResults?.[0]?.[0]?.id;
      if (firstMediaId) {
        await getHeroMedia(firstMediaId);
      }
    } catch (error) {
      console.error("Error fetching media list", error);
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  useEffect(() => {
    getMediaList();
  }, [isRoot]);

  useEffect(() => {
    if (isTrailerOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (!isTrailerOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isTrailerOpen]);

  return (
    <>
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

        <dialog
          className="w-full max-w-2xl backdrop:bg-black/70 backdrop:backdrop-blur-md z-50 fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#151515] p-7 rounded-2xl shadow-xl shadow-black/90"
          ref={modalRef}
          onClose={closeTrailerDialog}
        >
          {selectedMedia ? (
            <div className="text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedMedia.title || selectedMedia.name} - Trailer
                </h2>
                <button
                  onClick={closeTrailerDialog}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="i-ph-x-circle text-2xl"></div>
                </button>
              </div>
              <div className="text-center py-8 opacity-40 select-none">
                Video Not Available at this time.
              </div>
              <div className="absolute bottom-0 right-0 m-4 text-sm bg-[#404040] p-0.5 rounded-md cursor-default select-none">
                <span aria-label="Press Escape to Cancel">
                  <kbd>ESC</kbd>
                </span>
              </div>
            </div>
          ) : (
            <div className="text-white text-center py-8">No media selected</div>
          )}
        </dialog>
      </AppScroller>
    </>
  );
};

const MediaComponent = (props) => {
  return <MediaContent {...props} />;
};

export default MediaComponent;
