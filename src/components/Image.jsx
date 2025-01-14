const buildURL = (imagePath, width) => {
  if (!imagePath) return;
  return `https://image.tmdb.org/t/p/${width}${imagePath}`;
};
const Image = ({ item }) => {
  return (
    <img
      width="918"
      height="496"
      src={buildURL(item?.backdrop_path, "original")}
      srcSet={`
        ${buildURL(item?.backdrop_path, "w300")} 300w,
        ${buildURL(item?.backdrop_path, "w780")} 780w,
        ${buildURL(item?.backdrop_path, "w1280")} 1280w,
        ${buildURL(item?.backdrop_path, "original")} 2160w`}
      sizes="(max-width: 768px) 100vw,(max-width: 1200px) 85vw,1280px"
      className="w-full h-full object-cover aspect-video"
      alt={item?.title || item?.name}
      style={{ aspectRatio: "16/9" }}
      fetchpriority="high"
    />
  );
};

export default Image;
