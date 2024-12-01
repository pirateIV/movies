import AppScroller from "@/components/AppScroller";
import useHead from "@/hooks/useHead";
import { getMoviesByQuery } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  useHead("Search");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [{ movies, totalResults }, setSearchResults] = useState({
    movies: [],
    totalResults: 0,
  });

  useEffect(() => {
    const handleSearch = async () => {
      const { results: movies, total_results: totalResults } =
        await getMoviesByQuery(searchQuery);
      setSearchResults({ movies, totalResults });
    };
    handleSearch();

    if (searchQuery.length) {
      window.history.pushState({}, null, `/search?s=${searchQuery}`);
    } else {
      navigate("/search");
    }
  }, [searchQuery]);

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

            <div>
              {movies.map((movie) => (
                <div></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppScroller>
  );
};

export default Search;
