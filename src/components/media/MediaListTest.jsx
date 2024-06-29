import { useTranslation } from "react-i18next";
import MediaLink from "./MediaLink";
import MediaItem from "./Item";
import { twMerge } from "tailwind-merge";

const MediaListItems = ({ media, mediaItems, children }) => {
  switch (media.title) {
    case "Popular TV Shows":
      return mediaItems?.tv.map((item) => children(item));
    case "Top Rated TV Shows":
      return mediaItems?.top_rated.map((item) => children(item));
    case "TV Shows Airing Today":
      return mediaItems?.airing_today.map((item) => children(item));

    case "Popular Movies":
      return mediaItems?.movies.map((item) => children(item));
    case "Upcoming Movies":
      return mediaItems?.upcoming.map((item) => children(item));
    case "Top Rated Movies":
      return mediaItems?.top_rated.map((item) => children(item));
    case "Now Playing Movies":
      return mediaItems?.now_playing.map((item) => children(item));
    default:
      return null;
  }
};

const MediaList = ({ mediaItems, mediaList }) => {
  const { t } = useTranslation();

  return (
    <>
      {mediaList.map((media, i) => (
        <div key={i} className="popular">
          <div className="header">
            <h1>{t(media.title)}</h1>
            <MediaLink media={media}>{t("Explore more")}</MediaLink>
          </div>
          <div id="media-items-scroller">
            <div className="content">
              <MediaListItems media={media} mediaItems={mediaItems}>
                {(item) => (
                  <MediaItem key={item?.id} item={item} itemType={"tv"} />
                )}
              </MediaListItems>
              <MediaLink media={media}>
                <div className="media-item">
                  <div
                    className={twMerge(
                      "flex flex-col items-center justify-around",
                      "opacity-40 translate-y-1/2",
                    )}
                    aria-hidden={true}
                  >
                    <div
                      className={twMerge(
                        media.type === "movie"
                          ? "i-ph-film-strip"
                          : "i-ph-television-simple",
                        "text-lg sm:text-2xl lg:text-4xl`",
                      )}
                    ></div>
                    <div className="text-xl sm:text-base">
                      {t("Explore more")}
                    </div>
                  </div>
                </div>
              </MediaLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MediaList;
