import { useQuery, useQueries } from "@tanstack/react-query";
import { getMedia, listMedia } from "@/services/tmdb";
import { QUERY_LIST } from "@/constants/lists";

const useMediaData = (isRoot, pathname) => {
  const type = pathname.includes("tv") ? "tv" : "movie";
  const queries = isRoot
    ? [QUERY_LIST.movie[0], QUERY_LIST.tv[0]]
    : QUERY_LIST[type];

  const mediaQueries = useQueries({
    queries: queries.map((query) => ({
      queryKey: ["media", query.type, query.query],
      queryFn: () => listMedia(query.type, query.query, 1),
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  });

  const media = mediaQueries.map((query) =>
    query.data?.results ? [query.data.results] : [],
  );

  const heroId = media[0]?.[0]?.[0]?.id;
  const { data: item } = useQuery({
    queryKey: ["hero", type, heroId],
    queryFn: () => getMedia(type, heroId),
    enabled: !!heroId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
