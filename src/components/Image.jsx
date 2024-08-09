import { convertImageToWebP } from "@/utils/filter";
import { useEffect, useState } from "react";

const buildURL = (imagePath) => `http://image.tmdb.org/t/p/w1280${imagePath}`;

const Image = ({ item }) => {
  const [webpURL, setWebpURL] = useState("");
  const [loading, setLoading] = useState(true);

  const imageURL = item?.backdrop_path ? buildURL(item.backdrop_path) : null;

  useEffect(() => {
    const formatImage = async () => {
      if (imageURL) {
        try {
          await convertImageToWebP(imageURL, (url) => {
            setWebpURL(url);
          });
        } catch (error) {
          console.error("Failed to convert image to WebP:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    formatImage();
  }, [imageURL]);

  console.log(webpURL);

  return (
    <img
      width={1220}
      height={659}
      src={webpURL}
      sizes="(max-width: 400px) 50vw, 400px"
      className="w-full h-full object-cover"
      alt={item?.title || item?.name}
    />
  );
};

export default Image;
