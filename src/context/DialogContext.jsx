import { createContext, useContext, useState, useCallback } from "react";
import { getMedia } from "@/services/tmdb";

const DialogContext = createContext();

function findBestTrailer(results = []) {
  if (!Array.isArray(results) || results.length === 0) return null;
  return (
    results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
    ) ||
    results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    results.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
    results.find((v) => v.site === "YouTube") ||
    null
  );
}

export const DialogProvider = ({ children }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  const openTrailerDialog = useCallback(
    async (media, specificKey = null, mediaType = "movie") => {
      if (!media && !specificKey) return;

      setSelectedMedia(media);
      setIsTrailerOpen(true);

      const title = media?.title || media?.name || "Video";

      if (specificKey) {
        setTrailerKey(specificKey);
        setTrailerTitle(title);
        setIsLoadingTrailer(false);
        return;
      }

      // Check if media already contains videos
      if (media?.videos?.results && media.videos.results.length > 0) {
        const best = findBestTrailer(media.videos.results);
        if (best) {
          setTrailerKey(best.key);
          setTrailerTitle(`${title} · ${best.name || best.type}`);
        } else {
          setTrailerKey(null);
          setTrailerTitle(title);
        }
        setIsLoadingTrailer(false);
        return;
      }

      // Otherwise fetch the full media details with videos
      if (media?.id) {
        setIsLoadingTrailer(true);
        try {
          const type =
            media?.media_type || mediaType || (media?.title ? "movie" : "tv");
          const details = await getMedia(type, media.id);
          const best = findBestTrailer(details?.videos?.results);
          if (best) {
            setTrailerKey(best.key);
            setTrailerTitle(`${title} · ${best.name || best.type}`);
          } else {
            setTrailerKey(null);
            setTrailerTitle(title);
          }
        } catch (err) {
          console.error("Failed to fetch trailer videos", err);
          setTrailerKey(null);
        } finally {
          setIsLoadingTrailer(false);
        }
      } else {
        setTrailerKey(null);
        setIsLoadingTrailer(false);
      }
    },
    [],
  );

  const closeTrailerDialog = useCallback(() => {
    setIsTrailerOpen(false);
    setSelectedMedia(null);
    setTrailerKey(null);
    setTrailerTitle("");
    setIsLoadingTrailer(false);
  }, []);

  return (
    <DialogContext.Provider
      value={{
        isTrailerOpen,
        selectedMedia,
        trailerKey,
        trailerTitle,
        isLoadingTrailer,
        openTrailerDialog,
        closeTrailerDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
