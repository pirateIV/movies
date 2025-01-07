const buildURL = (imagePath, width) => {
  if (!imagePath) return;
  return `http://image.tmdb.org/t/p/${width}${imagePath}`;
};
const Image = ({ item }) => {
  return (
    <img
      width="907"
      height="490"
      src={buildURL(item?.backdrop_path, "w1280")}
      srcSet={`
        ${buildURL(item?.backdrop_path, "w300")} 300w,
        ${buildURL(item?.backdrop_path, "w780")} 780w,
        ${buildURL(item?.backdrop_path, "w1280")} 1280w,
        ${buildURL(item?.backdrop_path, "original")}`}
      sizes="(max-width: 768px) 100vw,(max-width: 1200px) 85vw,1280px"
      className="w-full h-full object-cover aspect-video"
      alt={item?.title || item?.name}
      fetchpriority="high"
    />
  );
};

export default Image;
