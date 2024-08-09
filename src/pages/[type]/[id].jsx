import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMedia } from "@/services/tmdb";
import HeroMedia from "@/components/media/Hero";

const MediaType = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const [item, setItem] = useState(null);

    const type = pathname.includes("tv") ? "tv" : "movie";

    useEffect(() => {
        async function getMediaItem() {
            const heroMedia = await getMedia(type, id);
            setItem(heroMedia?.data);
        }
        getMediaItem();
    }, []);

    return (
        <>
            <HeroMedia item={item} />
        </>
    );
};

export default MediaType;
