import MediaCard from "./Card";

const MediaAutoLoadGrid = ({ type, media, children }) => {
    return (
        <div className="p-10">
            <h1 className="flex gap-2 text-3xl">{children}</h1>

            <div className="grid grid-cols-5 mt-5">
                {media?.map((setItem) => (
                    <MediaCard item={setItem} query={{ type }} />
                ))}
            </div>
        </div>
    );
};

export default MediaAutoLoadGrid;
