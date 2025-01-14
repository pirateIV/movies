import { useQuery, useQueries } from "@tanstack/react-query";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";

const useMediaData = (isRoot, pathname) => {
  const type = pathname.includes("tv") ? "tv" : "movie";
  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  // Use React Query for media list
  const mediaQueries = useQueries({
    queries: queries.map((query) => ({
      queryKey: ["media", query.type, query.query],
      queryFn: () => listMedia(query.type, query.query, 1),
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    })),
  });

  const media = mediaQueries.map((query) =>
    query.data?.data?.results ? [query.data.data.results] : [],
  );

  // Use React Query for hero media
  const heroId = media[0]?.[0]?.[0]?.id;
  const { data: item } = useQuery({
    queryKey: ["hero", type, heroId],
    queryFn: () => getMedia(type, heroId),
    enabled: !!heroId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    select: (data) => data?.data,
  });

  return {
    item,
    media,
    type,
    queries,
    isLoading: mediaQueries.some((query) => query.isLoading),
    isError: mediaQueries.some((query) => query.isError),
  };
};

export default useMediaData;
