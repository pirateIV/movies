import { useAppSelector } from "@/app/hooks";

const AppLoader = ({ progress }) => {
  const isLoading = useAppSelector((state) => state.loader.loading);

  return (
    <>
      <div className="absolute inset-x-0 h-1 w-full pointer-events-none bg-transparent z-50">
        {/* {isLoading && (/ */}
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `10%`,
            background:
              "repeating-linear-gradient(to right, rgb(0, 220, 130) 0%, rgb(52, 205, 254) 50%, rgb(0, 71, 225) 100%)",
            // transform: "scaleX(0.5)",
            transformOrigin: "left center",
            transition: "transform 0.1s, height 0.4s, opacity 0.4s",
          }}
        ></div>
        {/* // )}/ */}
      </div>
    </>
  );
};

export default AppLoader;
