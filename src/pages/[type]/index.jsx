/**
 *  RECENT CODE FOR THE base, movies, tv components to pages/index.jsx
 */

// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { getMedia, listMedia } from "@/services/tmdb";
// import HeroMedia from "@/components/media/Hero";
// import { QUERY_LIST } from "@/constants/lists";
// import CarouselAutoQuery from "@/components/carousel/AutoQuery";

// const Media = () => {
//   const { pathname } = useLocation();
//   const [media, setMedia] = useState([]);

//   const type = pathname.includes("tv") ? "tv" : "movie";

//   useEffect(() => {
//     async function getMediaItems() {
//       const response = await Promise.all(
//         QUERY_LIST[type].map((query) => listMedia(type, query.query, 1)),
//       );
//       setMedia(response?.map((media) => [...media?.data?.results]));
//     }
//     getMediaItems();
//   }, []);

//   console.log(media);

//   return (
//     <>
//       <HeroMedia item={null} />
//       <CarouselAutoQuery
//         media={media}
//         queries={QUERY_LIST[type]}
//       ></CarouselAutoQuery>
//     </>
//   );
// };

// export default Media;

// const queries = [QUERY_LIST.movie[0], QUERY_LIST.tv[0]];

// const Root = () => {
//   const [item, setItem] = useState(null);
//   const [media, setMedia] = useState([]);

//   useEffect(() => {
//     async function getMediaDetails() {
//       try {
//         const response = await Promise.all(
//           queries.map((query) => listMedia(query.type, query.query, 1)),
//         );
//         setMedia(response?.map((media) => media?.data?.results));
//       } catch (error) {
//         console.error("Error fetching media", error);
//       }
//     }

//     getMediaDetails();
//   }, []);

//   useEffect(() => {
//     async function getHeroMedia(id) {
//       try {
//         if (media) {
//           const heroMedia = await getMedia("movie", id);
//           setItem(heroMedia?.data);
//         }
//       } catch (error) {
//         console.error("Error fetching media", error);
//       }
//     }

//     if (media?.length && media[0]?.length) {
//       getHeroMedia(media[0][0]?.id);
//     }
//   }, [media]);

//   return (
//     <>
//       <HeroMedia item={item} />
//       <CarouselAutoQuery media={media} queries={queries} />
//     </>
//   );
// };

// export default Root;
