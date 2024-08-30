import { imgBaseURL } from "@/config/tmdbAPI";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";

const buildURL = (imagePath, size) =>
  `${imgBaseURL}/f_webp&s_${size}/tmdb/${imagePath}`;

const PersonCard = ({ item, query, customclass }) => {
  return (
    <Link
      to={`/${query.type}/${item?.id}`}
      className={` ${customclass} pb-2 flex-1 w-[12.5rem]`}
    >
      <div className="block aspect-[10/16] p-1 bg-[#9ca3af1a] duration-300 hover:scale-105">
        {item?.profile_path ? (
          <Imgix
            width={500}
            height={800}
            className="object-cover h-full"
            src={buildURL(item.profile_path, "400x600")}
            // imgixParams={params}
            srcSet={
              (`${buildURL(item.profile_path, "400x600")}1x`,
              `${buildURL(item.profile_path, "800x1200")} 2x`)
            }
            htmlAttributes={{
              style: { viewTransitionName: `item-${item?.id}` },
            }}
            alt={item?.title || item?.name}
          />
        ) : (
          <div className="h-full opacity-10 flex justify-center">
            <div className="i-ph:user ma text-4xl"></div>
          </div>
        )}
      </div>
      <div className="mt-2">{item?.name || item?.title}</div>
      <div className="opacity-50">
        {item?.character || item?.known_for_department}
      </div>
    </Link>
  );
};

export default PersonCard;
