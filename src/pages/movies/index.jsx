import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import MediaItemImage from "components/media/item/MediaItemImage";
import MediaItemRating from "components/media/item/MediaItemRating";
import MediaItemTitle from "components/media/item/MediaItemTitle";
import {
  findPerson,
  formatDate,
  formatTime,
  numberWithCommas,
} from "utils/filters";
import languages from "@constants/languages";

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

export const RecommendedMovies = ({ recommendedMovies }) => {
  const { t } = useTranslation();

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
