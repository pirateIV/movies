import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { formatTime, formatVote } from "@/utils/filter";
import StarsRate from "../StarsRate";

const buildURL = (imagePath) => `https://image.tmdb.org/t/p/w780/${imagePath}`;

const params = {
  auto: "compress,format",
  fm: "webp",
  fit: "crop",
  w: 800,
  q: 100,
};

const HeroMedia = ({ type, item }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/${type}/${item?.id}`}>
      <div className="bg-black relative aspect-3/2 lg:aspect-25/9">
        {item?.backdrop_path && (
          <div className="absolute top-0 right-0 bottom-0 lg:left-1/3">
            <Imgix
              width={800}
              height={450}
              imgixParams={params}
              src={buildURL(item?.backdrop_path)}
              sizes="(max-width: 800px) 100vw, 800px"
              className="w-full h-full object-cover"
              htmlAttributes={{
                title: item?.title || item?.name,
              }}
              alt={item?.title || item?.name}
            />
          </div>
        )}

        <div
          id="hero-info"
          className={twMerge([
            "flex flex-col justify-center absolute top-0 bottom-0",
            "left-0 right-0 px-10 lg:px-[6.25rem] lg:w-2/3",
          ])}
        >
          {item && (
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl line-clamp-2">
                {item?.title || item?.name}
              </h1>
              <div className="flex gap-2 items-center mt-4">
                {item?.vote_average && (
                  <>
                    <StarsRate value={item?.vote_average} />
                    <div className="opacity-50 hidden md:block">
                      {formatVote(item?.vote_average)}
                    </div>
                    <span className="opacity-50 hidden md:block">·</span>
                  </>
                )}
                {item?.vote_count && (
                  <div className="opacity-50 hidden md:block">
                    {formatVote(item?.vote_count)} Reviews
                  </div>
                )}
                {item?.release_date && (
                  <>
                    <span className="opacity-50">·</span>
                    <div className="opacity-50">
                      {item?.release_date.slice(0, 4)}
                    </div>
                  </>
                )}
                {item?.runtime && (
                  <>
                    <span className="opacity-50">·</span>
                    <div className="opacity-50">
                      {formatTime(item?.runtime)}
                    </div>
                  </>
                )}
              </div>
              <p
                className={twMerge([
                  "mt-2 leading-5 md:text-start opacity-80 line-clamp-3",
                  "md:line-clamp-4 lg:line-clamp-5 text-xs md:text-base",
                ])}
              >
                {item?.overview}
              </p>

              <div className="py5 display-none lg:block">
                <button
                  type="button"
                  title="Watch Trailer"
                  className="flex gap-2 items-center px-6 py-3 transition-colors duration-200 hover:bg-[#9ca3af26]"
                >
                  <div className="i-ph-play"></div>
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute p-10 top-0 md:left-0 right-0 lg:hidden sm:right-0">
          <button
            title="Watch Trailer"
            className="text-5xl text-white/50 hover:text-white"
          >
            <div className="i-ph-play-circle-light"></div>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HeroMedia;
