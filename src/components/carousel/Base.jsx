import { useRef } from "react";
import { Link } from "react-router-dom";

const CarouselBase = ({ children, query }) => {
  const scrollEl = useRef(null);

  const scrollLeft = () => {
    scrollEl.current.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    scrollEl.current.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex py-3 px-10 items-center mt-5 ">
        <div className="text-2xl">{query?.title}</div>
        <div className="flex-auto"></div>
        <Link
          to={`/${query?.type}/category/${query?.query}`}
          className="n-link"
        >
          {query.type ? "Explore more" : ""}
        </Link>
      </div>
      <div className="relative lg:min-h-[480px]">
        <div className="overflow-y-auto" ref={scrollEl}>
          <div className="flex gap-2 w-max p-2 px-10">{children}</div>
        </div>

        <button
          type="button"
          title="Scroll left"
          onClick={scrollLeft}
          className="absolute inset-y-0 left-0 p-3 opacity-0 hover:opacity-100 duration-300 bg-black/50"
        >
          <div className="i-ph-caret-left-light text-3xl text-white"></div>
        </button>
        <button
          type="button"
          title="Scroll right"
          onClick={scrollRight}
          className="absolute inset-y-0 right-0 p-3 opacity-0 hover:opacity-100 duration-300 bg-black/50"
        >
          <div className="i-ph-caret-right-light text-3xl text-white"></div>
        </button>
      </div>
    </>
  );
};

export default CarouselBase;
