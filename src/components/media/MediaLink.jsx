import { Link, useLocation } from "react-router-dom";

const MediaLink = ({ children, media }) => {
  const location = useLocation();

  const changePathOnLocation = (path_one, path_two) =>
    location.pathname === "/" ? path_one : path_two;

  return (
    <Link
      to={changePathOnLocation(
        `${media.type}/category/${media.query}`,
        `/${media.type}/category/${media.query}`,
      )}
      aria-label={`Go to ${media.query}`}
    >
      {children}
    </Link>
  );
};

export default MediaLink;
