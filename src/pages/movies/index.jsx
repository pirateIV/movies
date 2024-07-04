import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import MediaItemImage from "components/media/item/MediaItemImage";
import MediaItemRating from "components/media/item/MediaItemRating";
import MediaItemTitle from "components/media/item/MediaItemTitle";

export const buttonTabs = ["Overview", "Videos", "Photos"];

const buildURL = (imagePath, size) =>
  `https://movies-proxy.vercel.app/ipx/f_webp&s_${size}/tmdb/${imagePath}`;

export const TabButtons = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <header id="tabs-header">
      {buttonTabs.map((button, i) => (
        <button
          key={i}
          className={twMerge(
            "text-xl",
            activeTab === button ? "n-tab n-tab-active" : "n-tab",
          )}
          onClick={() => setActiveTab(button)}
        >
          {t(button)}
        </button>
      ))}
    </header>
  );
};

export const CastDetails = ({ mediaDetails }) => {
  const { t } = useTranslation();
  return (
    <div className="media-list">
      <div className="header">
        <h1>{t("Cast")}</h1>
      </div>
      <div className="overflow-y-auto">
        <div id="cast-list">
          {mediaDetails?.credits?.cast.map((c, i) => (
            <Link key={i} to={`/person/${c.id}`} id="cast">
              {c.profile_path ? (
                <MediaItemImage imagePath={c.profile_path} />
              ) : (
                <div className="media-item">
                  <div className="h-full opacity-10">
                    <div className="i-ph:user m-auto text-4xl"></div>
                  </div>{" "}
                </div>
              )}
              <div className="mt-2">{c.name}</div>
              <div className="opacity-50">{c.character}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecommendedMovies = ({ recommendedMovies }) => {
  const { t } = useTranslation();

  console.log(recommendedMovies);

  return (
    <div className="media-list">
      <div className="header">
        <h1>{t("More like this")}</h1>
      </div>
      <div className="overflow-y-auto">
        <div id="similar-movies-list">
          {recommendedMovies?.map((similar) => (
            <Link key={similar.id} to={`/movie/${similar.id}`} id="similar">
              {similar.poster_path ? (
                <MediaItemImage
                  title={similar.title}
                  imagePath={similar.poster_path}
                />
              ) : (
                <div className="media-item">
                  <div className="h-full opacity-10">
                    <div className="i-ph:film-strip m-auto text-4xl"></div>
                  </div>{" "}
                </div>
              )}
              <MediaItemTitle title={similar.title} />
              <MediaItemRating voteAverage={similar.vote_average} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MovieDetails = ({ mediaDetails }) => {
  return (
    <div id="mov-details">
      <img
        width="400"
        height="600"
        loading="lazy"
        id="mov-poster-detail"
        src={buildURL(mediaDetails?.poster_path, "400x600")}
        srcSet={`${buildURL(mediaDetails?.poster_path, "400x600")} 1x,
       ${buildURL(mediaDetails?.poster_path, "800x1200")} 2x`}
        alt={`movie title: ${mediaDetails?.title}`}
      />

      <div className="flex flex-col gap-6 px-6">
        <div>
          <h2 className="text-3xl mb-4">Storyline</h2>
          <div className="opacity-80">{mediaDetails?.overview}</div>
        </div>
      </div>
    </div>
  );
};
