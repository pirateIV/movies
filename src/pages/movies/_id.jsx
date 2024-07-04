import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRecommendedMovies,
  getHeroMedia,
  getRecommendedMedia,
} from "redux/slices/mediaSlice";
import {
  CastDetails,
  MovieDetails,
  RecommendedMovies,
  TabButtons,
  buttonTabs,
} from ".";
import "./movies.css";

const Movie = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const mediaDetails = useSelector(getHeroMedia);
  const [activeTab, setActiveTab] = useState(buttonTabs[0]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const { recommended } = useSelector((state) => state.media);

  useEffect(() => {
    dispatch(fetchRecommendedMovies({ movieId }));
    setRecommendedMovies(recommended);
    console.log(recommended);
  }, [movieId]);

  return (
    <>
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <MovieDetails mediaDetails={mediaDetails} />
      <CastDetails mediaDetails={mediaDetails} />
      <RecommendedMovies recommendedMovies={recommendedMovies} />
    </>
  );
};

export default Movie;
