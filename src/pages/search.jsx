import AppScroller from "@/components/AppScroller";
import MediaAutoLoadGrid from "@/components/media/AutoLoadGrid";
import MediaCard from "@/components/media/Card";
import useHead from "@/hooks/useHead";
import { getMoviesByQuery } from "@/services/tmdb";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  useHead("Search");
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [{ movies, totalResults, page, totalPages }, setSearchResults] =
    useState({
      movies: [],
      totalResults: 0,
      page: 1,
      totalPages: 1,
    });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!searchQuery) {
      setSearchResults({ movies: [], totalResults: 0, page: 1, totalPages: 1 });
      return;
    }

    setIsLoading(true);
    const {
      results: newMovies,
      total_results: totalResults,
      total_pages: totalPages,
    } = await getMoviesByQuery(searchQuery, page);

    setSearchResults((prev) => ({
      movies: page === 1 ? newMovies : [...prev.movies, ...newMovies],
      totalResults,
      page,
      totalPages,
    }));
    setIsLoading(false);
  }, [searchQuery, page]);

  useEffect(() => {
    handleSearch();

    if (searchQuery.length) {
      window.history.pushState({}, null, `/search?s=${searchQuery}`);
    } else {
      navigate("/search");
    }
  }, [searchQuery, handleSearch]);

  // Handle scroll to bottom
  const handleScroll = useCallback(() => {
    const scroller = document.getElementById("app-scroller");
    if (!scroller) return;

    const bottom =
      scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight;
    if (bottom && page < totalPages && !isLoading) {
      setSearchResults((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [page, totalPages, isLoading]);

  useEffect(() => {
    const scroller = document.getElementById("app-scroller");
    if (!scroller) return;

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const medias = movies.filter((media) => media?.media_type !== "person");

  return (
    <AppScroller>
      <title>Search · React Movies</title>
      <div>
        <div className="flex bg-[#9ca3af1a] items-center px-6 py-4 gap-3 sticky">
          <div className="i-ph-magnifying-glass text-xl opacity-50"></div>
          <input
            type="text"
            className="text-2xl bg-transparent outline-none w-full"
            placeholder="Type to search..."
            autoFocus={true}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {!searchQuery ? (
          <div className="text-4xl p-10 opacity-50 text-center">
            Type something to search...
          </div>
        ) : (
          <div className="p-8">
            <div>
              <h2 className="text-3xl">Search Results for: {searchQuery}</h2>
              <p className="opacity-50">{totalResults} items</p>
            </div>
            <MediaAutoLoadGrid media={medias} />
            {isLoading && <div className="text-center py-4">Loading...</div>}
          </div>
        )}
      </div>
    </AppScroller>
  );
};

export default Search;
