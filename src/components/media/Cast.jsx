import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MediaItemImage from "./item/MediaItemImage";
import { getHeroMedia } from "redux/slices/mediaSlice";

const Cast = () => {
  const { t } = useTranslation();
  const mediaDetails = useSelector(getHeroMedia);

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

export default Cast;
