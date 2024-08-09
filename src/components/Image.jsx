import { convertImageToWebP } from "@/utils/filter";
import { useEffect, useState } from "react";

const buildURL = (imagePath) => `https://image.tmdb.org/t/p/720/${imagePath}`;

const Image = ({ item }) => {
    const [webpURL, setWebpURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const imageURL = item?.backdrop_path ? buildURL(item?.backdrop_path) : null;

    useEffect(() => {
        async function formatImage() {
            if (imageURL) {
                await convertImageToWebP(imageURL, (url) => {
                    setWebpURL(url);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }
        formatImage();
    }, [imageURL]);

    return (
        <>
            {webpURL && (
                <img
                    width={1220}
                    height={659}
                    src={webpURL}
                    sizes="(max-width: 400px) 50vw, 400px"
                    className="w-full h-full object-cover"
                    alt={item?.title || item?.name}
                />
            )}
        </>
    );
};

export default Image;
