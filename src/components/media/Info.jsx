import { imgBaseURL } from "@/config/tmdbAPI";
import languages from "@/constants/languages";
import {
  findPerson,
  formatDate,
  formatTime,
  numberWithCommas,
} from "@/utils/filter";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const buildURL = (imagePath, size) =>
  `${imgBaseURL}/f_webp&s_${size}/tmdb/${imagePath}`;

const MediaInfo = ({ item }) => {
  const { t } = useTranslation();

  const {
    runtime,
    budget,
    revenue,
    status,
    title,
    overview,
    genres,
    release_date: releaseDate,
    original_language: originalLanguage,
    production_companies: productionCompanies,
    poster_path: posterPath,
  } = item || {};

  const releaseDateFormatted = formatDate(releaseDate);
  const runtimeFormatted = formatTime(runtime);
  const director = findPerson(item, "Director");
  const budgetFormatted = numberWithCommas(budget);
  const revenueFormatted = numberWithCommas(revenue);
  const language =
    languages.find((lang) => lang.iso_639_1 === originalLanguage)
      ?.english_name || "";
  const productionCompaniesFormatted =
    productionCompanies?.map((prod) => prod.name).join(", ") || "";

  return (
    <div
      id="mov-details"
      className="p-4 grid grid-cols-[max-content_1fr] items-center gap-8 m-auto max-w-[75rem]"
    >
      <img
        width="400"
        height="600"
        loading="lazy"
        id="mov-poster-detail"
        alt={`movie title: ${title}`}
        src={buildURL(posterPath, "400x600")}
        srcSet={`${buildURL(posterPath, "400x600")} 1x, ${buildURL(posterPath, "800x1200")} 2x`}
        className="hidden w-[19.75rem] border-4 bg-[#9ca3af1a] border-[#9ca3af1a] shadow-lg object-cover md:block"
      />

      <div className="flex flex-col gap-6 max-w-full md:p-4">
        <div>
          <h2 className="text-3xl mb-4">Storyline</h2>
          <p className="opacity-80">{overview}</p>
        </div>

        <div className="text-sm opacity-80">
          <ul className="grid grid-cols-[max-content_1fr] items-center gap-3 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            <InfoItem item={releaseDateFormatted}>
              <span>{t("Released")}</span>
              <span>{releaseDateFormatted}</span>
            </InfoItem>

            <InfoItem item={runtimeFormatted}>
              <span>{t("Runtime")}</span>
              <span>{runtimeFormatted}</span>
            </InfoItem>

            <InfoItem item={director}>
              <span>{t("Director")}</span>
              <div>
                <Link to={`/person/${director?.id}`} className="pointer-link">
                  {director?.name}
                </Link>
              </div>
            </InfoItem>

            <InfoItem item={budgetFormatted}>
              <span>{t("Budget")}</span>
              <span>${budgetFormatted}</span>
            </InfoItem>

            <InfoItem item={revenueFormatted}>
              <span>{t("Revenue")}</span>
              <span>${revenueFormatted}</span>
            </InfoItem>

            <InfoItem item={genres}>
              <span>{t("Genre")}</span>
              <span className="flex flex-wrap gap-2">
                {genres?.map(({ id, name }) => (
                  <Link
                    key={id}
                    to={`/genre/${id}/movie`}
                    className="pointer-link"
                  >
                    {name}
                  </Link>
                ))}
              </span>
            </InfoItem>

            <InfoItem item={status}>
              <span>{t("Status")}</span>
              <span>{status}</span>
            </InfoItem>
            <InfoItem item={language}>
              <span>{t("Language")}</span>
              <span>{language}</span>
            </InfoItem>
            <InfoItem item={productionCompaniesFormatted}>
              <span>{t("Production")}</span>
              <span>{productionCompaniesFormatted}</span>
            </InfoItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MediaInfo;

const InfoItem = ({ item, children }) => {
  return item && children;
};
