import useHead from "@/hooks/useHead";
import MediaComponent from "@/pages";

const TVShows = () => {
  useHead("TV Shows");
  return <MediaComponent />;
};

export default TVShows;
