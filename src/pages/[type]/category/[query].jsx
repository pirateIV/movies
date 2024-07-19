import { useLocation, useParams } from "react-router-dom";
import MediaAutoLoadGrid from "@/components/media/AutoLoadGrid";
import useHead from "@/hooks/useHead";

const MediaQuery = () => {
  const { query } = useParams();
  const { pathname } = useLocation();

  return (
    <MediaAutoLoadGrid>
      <span className="capitalize">{query.replace(/_/g, " ")}</span>
      <span>{pathname.includes("tv") ? "TV Shows" : "Movies"}</span>
    </MediaAutoLoadGrid>
  );
};

export default MediaQuery;
