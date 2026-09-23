import { createApp, defineEventHandler, proxyRequest } from "h3";
import {
  createIPX,
  createIPXH3Handler,
  ipxFSStorage,
  ipxHttpStorage,
} from "ipx";
import { listen } from "listhen";

const ipx = createIPX({
  storage: ipxFSStorage({ dir: "./public" }),
  httpStorage: ipxHttpStorage({ domains: ["picsum.photos"] }),
});

// Proxies TMDB requests server-side so the API key (server-only env var,
// never a VITE_-prefixed one) is never bundled into client-side JavaScript.
const tmdbHandler = defineEventHandler((event) => {
  const [path, query = ""] = event.path.replace(/^\/tmdb\//, "").split("?");
  const params = new URLSearchParams(query);
  params.set("api_key", process.env.TMDB_API_KEY);

  return proxyRequest(event, `https://api.themoviedb.org/3/${path}?${params}`);
});

const app = createApp()
  .use("/", createIPXH3Handler(ipx))
  .use("/tmdb", tmdbHandler);

listen(app);
