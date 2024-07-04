import { Link } from "react-router-dom";
import MediaItemImage from "./item/MediaItemImage";
import MediaItemTitle from "./item/MediaItemTitle";
import MediaItemRating from "./item/MediaItemRating";

const MediaItem = ({ item, itemType }) => {
  const {
    id,
    name,
    title,
    poster_path: imagePath,
    vote_average: voteAverage,
  } = item;
  const text = title || name || "...";

  return (
    <Link
      to={`/${itemType}/${id}`}
      className="block flex-1 pb-2 w-28 sm:w-40 md:w-60"
    >
      <MediaItemImage imagePath={imagePath} title={text} />
      <MediaItemTitle title={text} />
      <MediaItemRating voteAverage={voteAverage} />
    </Link>
  );
};

export default MediaItem;
