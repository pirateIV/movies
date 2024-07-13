import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import languages from "@constants/languages";

const Info = () => {
  const { t } = useTranslation();
  const mediaDetails = useSelector(getHeroMedia);

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
  } = mediaDetails || {};

  const releaseDateFormatted = formatDate(releaseDate);
  const runtimeFormatted = formatTime(runtime);
  const director = findPerson(mediaDetails, "Director");
  const budgetFormatted = numberWithCommas(budget);
  const revenueFormatted = numberWithCommas(revenue);
  const language =
    languages.find((lang) => lang.iso_639_1 === originalLanguage)
      ?.english_name || "";
  const productionCompaniesFormatted =
    productionCompanies?.map((prod) => prod.name).join(", ") || "";

  console.log(mediaDetails);

  return (
    <div id="mov-details">
      <img
        width="400"
        height="600"
        aspect="10/16"
        loading="lazy"
        id="mov-poster-detail"
        src={buildURL(posterPath, "400x600")}
        srcSet={`${buildURL(posterPath, "400x600")} 1x, ${buildURL(posterPath, "800x1200")} 2x`}
        alt={`movie title: ${title}`}
      />

      <div className="w-[calc(100vw-2rem)] md:w-auto flex flex-col gap-6 px-6">
        <div>
          <h2 className="text-3xl mb-4">{t("Storyline")}</h2>
          <div className="opacity-80">{overview}</div>
        </div>

        <div className="text-sm opacity-80">
          <ul className="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3 items-center">
            <div>{t("Released")}</div>
            <div>{releaseDateFormatted}</div>

            <div>{t("Runtime")}</div>
            <div>{runtimeFormatted}</div>

            <div>{t("Director")}</div>
            <div>
              <Link to={`/person/${director.id}`} className="item-link">
                {director.name}
              </Link>
            </div>

            <div>{t("Budget")}</div>
            <div>${budgetFormatted}</div>

            <div>{t("Revenue")}</div>
            <div>${revenueFormatted}</div>

            <div>{t("Genre")}</div>
            <div className="flex flex-wrap gap-1">
              {genres?.map(({ id, name }) => (
                <Link to={`/genre/${id}/movie`} key={id} className="item-link">
                  {name}
                </Link>
              ))}
            </div>

            <div>{t("Status")}</div>
            <div>{status}</div>

            <div>{t("Language")}</div>
            <div>{language}</div>

            <div>{t("Production")}</div>
            <div>{productionCompaniesFormatted}</div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
