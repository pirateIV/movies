import { Link } from "react-router-dom";

const HeroMedia = ({ item }) => {
  return (
    <Link to={`/movie/${item?.id}`}>
      <div className="bg-black aspect-3/2 lg:aspect-25/9"></div>
    </Link>
  );
};

export default HeroMedia;
