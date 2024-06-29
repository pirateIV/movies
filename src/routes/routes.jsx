import { createBrowserRouter } from "react-router-dom";

import Root from "root";
import TV from "@pages/tv/TV";
import TVShow from "@pages/tv/_id";
import Movie from "@pages/movies/_id";
import Movies from "@pages/movies/Movies";
import Search from "@pages/search/Search";
import NotFound from "@pages/404/404";
import Person from "@pages/person/Person";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/movie",
        element: <Movies />,
      },
      {
        path: "/movie/:movieId",
        element: <Movie />,
      },
      {
        path: "/movie/category/popular",
        element: null,
      },
      {
        path: "/movie/category/top_rated",
        element: null,
      },
      {
        path: "/movie/category/upcoming",
        element: null,
      },
      {
        path: "/movie/category/now_playing",
        element: null,
      },
      {
        path: "/tv",
        element: <TV />,
      },
      {
        path: "/tv/:tvId",
        element: <TVShow />,
      },
      {
        path: "/tv/category/popular",
        element: null,
      },
      {
        path: "/tv/category/top_rated",
        element: null,
      },
      {
        path: "/tv/category/airing_today",
        element: null,
      },
      {
        path: "/person/personId",
        element: <Person />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
