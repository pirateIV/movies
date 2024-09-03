const imgBaseURL = "https://movies-proxy.vercel.app/ipx/f_webp&s_400x600/tmdb/";

const Photos = ({ item }) => {
  console.log(item);
  return (
    <div className="flex flex-col px-4 py-8 gap-6 md:px-16">
      <div className="flex gap-2 items-baseline">
        <div className="text-2xl">Backdrops </div>
        <div className="text-sm opacity-50">
          {item?.images.backdrops.length} images
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-4">
        {item?.images.backdrops.map((image, i) => (
          <button
            key={i}
            className="relative w-full overflow-hidden aspect-[16/9] transition duration-300 hover:scale-[1.02] z-10"
            title="View Photo"
          >
            <img
              width="400"
              height="600"
              src={imgBaseURL + image.file_path}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-baseline">
        <div className="text-2xl">Posters </div>
        <div className="text-sm opacity-50">
          {item?.images.posters.length} images
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-4 lg:grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))]">
        {item?.images.posters.map((image, i) => (
          <button
            key={i}
            className="text-left block aspect-[9/16] transition duration-300 hover:scale-[1.02] z-10"
            title="View Photo"
          >
            <img
              width="400"
              height="600"
              src={imgBaseURL + image.file_path}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Photos;
