import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import { imgBaseURL } from "@/config/tmdbAPI";
import { useRef } from "react";
import StarsRate from "../StarsRate";
import { formatVote } from "@/utils/filter";

const buildURL = (imagePath, size) =>
  `${imgBaseURL}/f_webp&s_${size}/tmdb/${imagePath}`;

const params = {
  auto: "compress,format",
  fm: "webp",
  fit: "crop",
  w: 400,
  q: 100,
};

const CarouselBase = ({ media, query }) => {
  const scrollEl = useRef(null);

  const scrollLeft = () => {
    scrollEl.current.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    scrollEl.current.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex py-3 px-10 items-center mt-5 ">
        <div className="text-2xl">{query.title}</div>
        <div className="flex-auto"></div>
        <Link to={`/${query.type}/category/${query.query}`} className="n-link">
          Explore more
        </Link>
      </div>
      <div className="relative">
        <div className="overflow-y-auto" ref={scrollEl}>
          <div className="flex gap-2 w-max p-2 px-10">
            {media?.map((item) => (
              <Link
                to={`/${query.type}/${item?.id}`}
                className="pb-2 flex-1 w-40 md:w-60"
              >
                <div className="block aspect-[10/16] p-1 bg-[#9ca3af1a] duration-300 hover:scale-105">
                  {item?.poster_path ? (
                    <Imgix
                      width="400"
                      height="600"
                      className="object-cover h-full"
                      src={buildURL(item.poster_path, "400x600")}
                      imgixParams={params}
                      srcSet={
                        (`${buildURL(item.poster_path, "400x600")}1x`,
                        `${buildURL(item.poster_path, "800x1200")} 2x`)
                      }
                      alt={item?.title || item?.name}
                      htmlAttributes={{
                        style: {
                          display: item.poster_path ? "block" : "none",
                          viewTransitionName: item - `${item?.id}`,
                        },
                      }}
                    />
                  ) : (
                    <div className="h-full op10 flex justify-center items-center">
                      <div className="i-ph:question ma text-4xl"></div>
                    </div>
                  )}
                </div>
                <div className="mt-2">{item?.name || item?.title}</div>
                <div className="flex items-center gap-2">
                  <StarsRate value={item?.vote_average} width="w-20" />
                  <span className="text-sm opacity-50">
                    {formatVote(item?.vote_average)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          title="Scroll left"
          onClick={scrollLeft}
          className="absolute inset-y-0 left-0 p-3 opacity-0 hover:opacity-100 duration-300 bg-black/50"
        >
          <div className="i-ph-caret-left-light text-3xl text-white"></div>
        </button>
        <button
          type="button"
          title="Scroll right"
          onClick={scrollRight}
          className="absolute inset-y-0 right-0 p-3 opacity-0 hover:opacity-100 duration-300 bg-black/50"
        >
          <div className="i-ph-caret-right-light text-3xl text-white"></div>
        </button>
      </div>
    </>
  );
};

export default CarouselBase;
