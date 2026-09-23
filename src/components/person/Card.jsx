import { Link } from "react-router-dom";

const buildURL = (imagePath, size) => {
  if (!imagePath) return "";
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `https://image.tmdb.org/t/p/w${size === "400x600" ? "342" : "500"}${cleanPath}`;
};

const PersonCard = ({ item, query, customclass }) => {
  return (
    <Link
      to={`/${query?.type || "person"}/${item?.id}`}
      className={`${customclass || ""} pb-2 flex-1 w-40 md:w-50`}
    >
      <div className="block aspect-10/16 p-1 bg-[#9ca3af1a] rounded duration-300 hover:scale-105">
        {item?.profile_path ? (
          <img
            width={500}
            height={800}
            className="object-cover h-full w-full rounded"
            src={buildURL(item.profile_path, "400x600")}
            srcSet={`${buildURL(item.profile_path, "400x600")} 1x, ${buildURL(item.profile_path, "800x1200")} 2x`}
            alt={item?.name || "Person"}
            loading="lazy"
          />
        ) : (
          <div className="h-full opacity-10 flex justify-center items-center">
            <div className="i-ph:user ma text-4xl"></div>
          </div>
        )}
      </div>
      <div className="mt-2 text-sm font-medium line-clamp-1">{item?.name}</div>
      <div className="text-xs opacity-50 line-clamp-1">
        {item?.character || item?.job || item?.known_for_department}
      </div>
    </Link>
  );
};

export default PersonCard;
