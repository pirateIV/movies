import { Link } from "react-router-dom";
import { imgBaseURL } from "@/config/tmdbAPI";
import { formatVote } from "@/utils/filter";
import StarsRate from "../StarsRate";

const buildURL = (imagePath, size) =>
  `${imgBaseURL}/f_webp&s_${size}/tmdb${imagePath}`;

const params = {
  auto: "compress,format",
  fm: "webp",
  fit: "crop",
  w: 400,
  q: 100,
};

const MediaCard = ({ item, query, customclass }) => {
  const href = `/${query?.type || item?.media_type}/${item?.id}`;

  return (
    <Link
      to={href}
      className={` ${customclass || ""} pb-2 flex-1 w-40 md:w-60`}
      viewTransition
    >
      <div className="block aspect-[10/16] p-1 bg-[#9ca3af1a] duration-300 hover:scale-105">
        {item?.poster_path ? (
          <img
            width={400}
            height={600}
            className="object-cover h-full"
            src={buildURL(item.poster_path, "400x600")}
            alt={item?.title || item?.name}
            style={{
              viewTransitionName: `item-${item?.id}`,
              aspectRatio: "2/3",
            }}
            fetchpriority="high"
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
  );
};

export default MediaCard;
