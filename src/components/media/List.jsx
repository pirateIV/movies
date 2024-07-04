import { useTranslation } from "react-i18next";
import MediaLink from "./MediaLink";
import MediaItem from "./Item";
import { twMerge } from "tailwind-merge";

const MediaList = ({ mediaItems, mediaList }) => {
  const { t } = useTranslation();

  return (
    <>
      {mediaList.map((media, i) => (
        <div key={i} className="media-list">
          <div className="header">
            <h1>{t(media.title)}</h1>
            <MediaLink media={media}>{t("Explore more")}</MediaLink>
          </div>
          <div id="media-items-scroller">
            <div className="content">
              {media.title === "Popular Movies" &&
                mediaItems?.movies.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "Popular TV Shows" &&
                mediaItems?.tv.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "Upcoming Movies" &&
                mediaItems?.upcoming.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "Top Rated Movies" &&
                mediaItems?.top_rated.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "Now Playing Movies" &&
                mediaItems?.now_playing.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "Top Rated TV Shows" &&
                mediaItems?.top_rated.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {media.title === "TV Shows Airing Today" &&
                mediaItems?.airing_today.map((item) => (
                  <MediaItem key={item?.id} item={item} itemType={media.type} />
                ))}

              {Array.from(
                Array(Object.values(mediaItems) > 0 ? 1 : 20).keys(),
              ).map(() => (
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
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MediaList;
