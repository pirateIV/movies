const StarRatings = ({ votes, className }) => {
  const style = () => {
    return { clipPath: `inset(0 ${100 - votes * 10}% 0 0)` };
  };

  return (
    <div
      className={`stars_votes_average w-[6.25rem] ${className}`}
      style={{
        filter: "hue-rotate(320deg)",
      }}
    >
      <img src="/stars.webp" aria-hidden="true" />
      <img
        src="/stars-filled.webp"
        className="absolute inset-0"
        aria-hidden="true"
        style={style()}
      />
    </div>
  );
};

export default StarRatings;
