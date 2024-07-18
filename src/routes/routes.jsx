import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Movies from "@/pages/[type]/movie";
import TVShows from "@/pages/[type]/tv";

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
        element: "",
      },
    ],
  },
]);

export default router;
