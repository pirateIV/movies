import React from "react";
import { ScrollRestoration } from "react-router-dom";

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
