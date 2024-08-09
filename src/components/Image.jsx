import Imgix from "react-imgix";
import { imgBaseURL } from "@/config/tmdbAPI";

// const buildURL = (imagePath) =>
//   ` ${imgBaseURL}/f_webp&s_1220x659/tmdb/${imagePath}`;
const buildURL = (imagePath) => `http://image.tmdb.org/t/p/w1280${imagePath}`;

const Image = ({ item }) => {
  const imageURL = buildURL(item?.backdrop_path) || null;

  return (
    <Imgix
      width={1280}
      height={720}
      imgixParams={{ fm: "webp", auto: "compress,format" }}
      src={imageURL}
      className="w-full h-full object-cover"
      alt={item?.title || item?.name}
    />
  );
};

export default Image;
