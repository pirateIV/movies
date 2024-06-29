import StarRatings from "components/StarRatings";

const MediaItemRating = ({ voteAverage }) => (
  <div className="flex items-center text-sm gap-2">
    <StarRatings votes={voteAverage} className="!w-20" />
    <span className="opacity-60">{voteAverage.toFixed(1)}</span>
  </div>
);
export default MediaItemRating;
