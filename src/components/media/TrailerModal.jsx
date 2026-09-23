import { useEffect, useRef } from "react";
import { useDialog } from "@/context/DialogContext";

const TrailerModal = () => {
  const modalRef = useRef(null);
  const {
    isTrailerOpen,
    trailerKey,
    trailerTitle,
    isLoadingTrailer,
    closeTrailerDialog,
  } = useDialog();

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (isTrailerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isTrailerOpen && dialog.open) {
      dialog.close();
    }
  }, [isTrailerOpen]);

  // Close when clicking outside the dialog content (on backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      closeTrailerDialog();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onClose={closeTrailerDialog}
      onClick={handleBackdropClick}
      className="w-[95vw] max-w-4xl backdrop:bg-black/80 backdrop:backdrop-blur-md z-50 fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#141414] p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10 text-white outline-none"
    >
      <div className="flex flex-col gap-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-lg sm:text-xl font-semibold truncate">
            {trailerTitle || "Trailer"}
          </h2>
          <button
            type="button"
            onClick={closeTrailerDialog}
            title="Close Trailer (Esc)"
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="i-carbon-close text-2xl"></div>
          </button>
        </div>

        {/* Video Player / Loading / Empty State */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/90 flex items-center justify-center">
          {isLoadingTrailer ? (
            <div className="flex flex-col items-center gap-3 text-white/60">
              <div className="i-carbon:circle-dash text-4xl animate-spin"></div>
              <span className="text-sm">Loading trailer...</span>
            </div>
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title={trailerTitle || "Trailer Video"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center gap-2 p-8 text-center text-white/50">
              <div className="i-ph-television-simple text-4xl mb-1 opacity-40"></div>
              <p className="text-base font-medium">Trailer not available</p>
              <p className="text-xs text-white/40 max-w-sm">
                No official video trailer could be found for this title at this
                time.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="flex justify-between items-center text-xs text-white/40 pt-1">
          <span>Official TMDb Video Stream</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </span>
        </div>
      </div>
    </dialog>
  );
};

export default TrailerModal;
