const buildURL = (imagePath) => `http://image.tmdb.org/t/p/w1280/${imagePath}`;

const Image = ({ item }) => {
  const imageURL = buildURL(item?.backdrop_path) || null;

  return (
    <img
      width={1280}
      height={720}
      src={imageURL}
      className="w-full h-full object-cover"
      alt={item?.title || item?.name}
    />
  );
};

export default Image;
