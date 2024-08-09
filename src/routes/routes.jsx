import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Movies from "@/pages/genre/[no]/movie";
import TVShows from "@/pages/genre/[no]/tv";
import MediaType from "@/pages/[type]/[id]";
import Search from "@/pages/search";
import MediaQuery from "@/pages/[type]/category/[query]";

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
                element: <MediaType />,
            },
            {
                path: "/tv/:id",
                element: <MediaType />,
            },
            {
                path: "/movie/category/:query",
                element: <MediaQuery />,
            },
            {
                path: "/tv/category/:query",
                element: <MediaQuery />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },
]);

export default router;
