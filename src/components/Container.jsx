import { Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_LIST } from "constants/lists";
import { fetchMediaCollection, fetchHeroMedia } from "redux/slices/mediaSlice";
import HeroMedia from "./media/HeroMedia";
import MediaList from "./media/List";
import Footer from "./Footer";

const initialQueries = [QUERY_LIST.movie[0], QUERY_LIST.tv[0]];

const Container = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { movieId, tvId } = useParams();
  const { heroMedia, mediaCollection } = useSelector((state) => state.media);

  const [selectedMediaType, setSelectedMediaType] = useState("movie");

  const determineQueries = () => {
    if (location.pathname.includes("movie")) {
      return [initialQueries[0]];
    } else if (location.pathname.includes("tv")) {
      return [initialQueries[1]];
    }
    return initialQueries;
  };

  const currentQueries = determineQueries();

  useEffect(() => {
    dispatch(fetchMediaCollection());
  }, [dispatch]);

  useEffect(() => {
    if (!location.pathname.includes("tv")) {
      const selectedMovieId = movieId ? movieId : mediaCollection.movies[0]?.id;
      dispatch(fetchHeroMedia({ type: "movie", id: selectedMovieId }));
      setSelectedMediaType("movie");
    } else if (location.pathname.includes("tv")) {
      const selectedTvId = tvId ? tvId : mediaCollection.tv[0]?.id;
      dispatch(fetchHeroMedia({ type: "tv", id: selectedTvId }));
      setSelectedMediaType("tv");
    }
  }, [dispatch, location, movieId, tvId, mediaCollection]);

  return (
    <div id="app-scroller">
      <div>
        {!location.pathname.includes("search") && (
          <HeroMedia type={selectedMediaType} item={heroMedia} />
        )}
        {!location.pathname.includes("search") &&
          !location.pathname.includes(movieId || tvId) && (
            <MediaList
              mediaItems={mediaCollection}
              mediaList={currentQueries}
            />
          )}
        {children}
        {!location.pathname.includes("search") && <Footer />}
      </div>
    </div>
  );
};

export default Container;
