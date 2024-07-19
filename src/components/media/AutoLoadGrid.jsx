const MediaAutoLoadGrid = ({ children }) => {
  return (
    <div className="p-10">
      <h1 className="flex gap-2 text-3xl">{children}</h1>

      <div className="grid"></div>
    </div>
  );
};

export default MediaAutoLoadGrid;
