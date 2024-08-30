import React from "react";

const AppScroller = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <div
      ref={ref}
      {...rest}
      id="app-scroller"
      className="lg:order-2 overflow-x-hidden overflow-y-auto"
    >
      <div>{children}</div>
    </div>
  );
});

export default AppScroller;
