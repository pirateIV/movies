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

  useEffect(() => {
    dispatch(fetchMediaCollection());
  }, [dispatch]);

  useEffect(() => {
    // if (!location.pathname.includes("tv")) {
    const id = movieId ? movieId : mediaCollection.movies[0]?.id;
    dispatch(fetchHeroMedia({ type: "movie", id: id }));
    // }
    // else if (location.pathname.includes("tv")) {
    //   const selectedTvId = tvId ? tvId : mediaCollection.tv[0]?.id;
    //   dispatch(fetchHeroMedia({ type: "tv", id: selectedTvId }));
    //   setSelectedMediaType("tv");
    // }
  }, [dispatch, location, movieId, tvId, mediaCollection]);

  return (
    <div id="app-scroller">
      <div>
        {!location.pathname.includes("search") &&
          !location.pathname.includes("tv") && (
            <HeroMedia type={"movie"} item={heroMedia} />
          )}
        {!location.pathname.includes("search") &&
          !location.pathname.includes(movieId || tvId) && (
            <MediaList
              mediaItems={mediaCollection}
              mediaList={initialQueries}
            />
          )}
        {children}
        {!location.pathname.includes("search") && <Footer />}
      </div>
    </div>
  );
};

export default Container;
