import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Movies from "@/pages/genre/[no]/movie";
import TVShows from "@/pages/genre/[no]/tv";
import Search from "@/pages/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/movie",
        element: <Movies />,
      },
      {
        path: "/tv",
        element: <TVShows />,
      },
      {
        path: "/movie/:id",
      },
      {
        path: "/tv/:id",
      },
      {
        path: "/movie/category/:query",
      },
      {
        path: "/tv/category/:query",
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
