const Search = () => {
  return (
    <div>
      <div className="flex bg-[#9ca3af1a] items-center px-6 py-4 gap-3 sticky">
        <div className="i-ph-magnifying-glass text-xl opacity-50"></div>
        <input
          type="text"
          className="text-2xl bg-transparent outline-none w-full"
          placeholder="Type to search..."
          autoFocus={true}
        />
      </div>
      <div className="text-4xl p-10 opacity-50 text-center">
        Type something to search...
      </div>
    </div>
  );
};

export default Search;
