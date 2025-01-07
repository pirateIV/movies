const buildURL = (imagePath) => `http://image.tmdb.org/t/p/w1280/${imagePath}`;

const Image = ({ item }) => {
  const imageURL = buildURL(item?.backdrop_path) || "";

  return (
    <img
      width="1220"
      height="659"
      src={imageURL}
      className="w-full h-full object-cover"
      alt={item?.title || item?.name}
      fetchpriority="high"
    />
  );
};

export default Image;
