import MediaCard from "./Card";

const MediaAutoLoadGrid = ({ type, media, children }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="flex gap-2 text-2xl sm:text-3xl">{children}</h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 sm:mt-8 lg:mt-10">
        {media?.map((setItem) => (
          <MediaCard
            key={setItem.id}
            item={setItem}
            query={{ type }}
            customclass="media-card"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaAutoLoadGrid;
