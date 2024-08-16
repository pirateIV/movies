const AppScroller = ({ children, scrollerRef }) => {
  return (
    <div
      id="app-scroller"
      ref={scrollerRef}
      className="lg:order-2 overflow-x-hidden overflow-y-auto"
    >
      <div>{children}</div>
    </div>
  );
};

export default AppScroller;
