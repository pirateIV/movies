import { createApp } from "h3";
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

const app = createApp().use("/", createIPXH3Handler(ipx));

listen(app);
