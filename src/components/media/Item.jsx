const MediaItem = ({ value, children }) => {
  return value ? <>{children}</> : null;
};

export default MediaItem;
