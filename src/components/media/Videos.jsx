import { useDialog } from "@/context/DialogContext";
import { formatDate } from "@/utils/filter";

const TYPE_ORDER = {
  Trailer: 1,
  Teaser: 2,
  Clip: 3,
  Featurette: 4,
  "Behind the Scenes": 5,
  Bloopers: 6,
};

const Videos = ({ item }) => {
  const { openTrailerDialog } = useDialog();

  const allVideos = item?.videos?.results || [];
  const youtubeVideos = allVideos
    .filter((v) => v.site === "YouTube" && v.key)
    .sort((a, b) => {
      const orderA = TYPE_ORDER[a.type] || 99;
      const orderB = TYPE_ORDER[b.type] || 99;
      return orderA - orderB;
    });

  if (youtubeVideos.length === 0) {
    return (
      <div className="py-24 px-4 flex flex-col items-center justify-center text-center">
        <div className="i-ph-television-simple text-6xl text-white/20 mb-4"></div>
        <h3 className="text-xl font-medium text-white/70 mb-1">
          No videos available
        </h3>
        <p className="text-sm text-white/40 max-w-md">
          There are currently no official trailers, clips, or featurettes
          available for this title.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-2xl font-semibold">Videos</h2>
        <span className="text-sm text-white/50">
          {youtubeVideos.length}{" "}
          {youtubeVideos.length === 1 ? "video" : "videos"}
        </span>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {youtubeVideos.map((video) => (
          <button
            key={video.id || video.key}
            type="button"
            onClick={() => openTrailerDialog(item, video.key)}
            className="group text-left flex flex-col gap-2 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[rgb(64,193,173)]/50 transition duration-200"
          >
            {/* Thumbnail with overlay */}
            <div className="relative aspect-video w-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-300">
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={video.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-[rgb(64,193,173)]/90 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <div className="i-ph-play text-xl ml-0.5"></div>
                </div>
              </div>

              {/* Type Badge */}
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-black/70 backdrop-blur-sm rounded text-white/90 border border-white/10">
                  {video.type || "Video"}
                </span>
              </div>

              {/* Official Badge */}
              {video.official && (
                <div className="absolute top-2 right-2">
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-[rgb(64,193,173)]/90 text-black rounded shadow">
                    Official
                  </span>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="px-1">
              <h3 className="text-sm font-medium text-white/90 line-clamp-2 group-hover:text-[rgb(64,193,173)] transition-colors">
                {video.name}
              </h3>
              {video.published_at && (
                <p className="text-xs text-white/40 mt-0.5">
                  {formatDate(video.published_at)}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Videos;
