import { useState } from "react";
import {
  Outlet,
  UNSAFE_ViewTransitionContext,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MediaComponent from "@/pages";
import NavBar from "@/components/NavBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative font-sans h-full w-full">
        <div className="h-full w-full grid grid-rows-[1fr,max-content] lg:grid-rows-none lg:grid-cols-[max-content,1fr]">
          <title>React Movies</title>
          {pathname === "/" ? <MediaComponent isRoot={true} /> : <Outlet />}
          <NavBar />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
