import { useLocation, useParams } from "react-router-dom";
import MediaAutoLoadGrid from "@/components/media/AutoLoadGrid";
import useHead from "@/hooks/useHead";
import { useEffect, useState } from "react";
import { listMedia } from "@/services/tmdb";

const MediaQuery = () => {
    const { query } = useParams();
    const { pathname } = useLocation();
    const [page, setPage] = useState(1);
    const [media, setMedia] = useState([]);

    const type = pathname.includes("tv") ? "tv" : "movie";

    useEffect(() => {
        const fetchMediaPages = async () => {
            try {
                const res = await listMedia(type, query, page);
                const data = await res.data;
                console.log(data?.results);

                setMedia(data?.results);
            } catch (error) {
                console.log("Error occured fetching media", error);
            }
        };
        fetchMediaPages();
    }, []);

    return (
        <MediaAutoLoadGrid type={type} media={media}>
            <span className="capitalize">{query.replace(/_/g, " ")}</span>
            <span>{pathname.includes("tv") ? "TV Shows" : "Movies"}</span>
        </MediaAutoLoadGrid>
    );
};

export default MediaQuery;
