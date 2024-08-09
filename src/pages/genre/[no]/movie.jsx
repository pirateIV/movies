import useHead from "@/hooks/useHead";
import MediaComponent from "@/pages";

const Movies = () => {
  useHead("Movies");
  return <MediaComponent />;
};

export default Movies;
