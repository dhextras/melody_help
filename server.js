import http from "http";
import dotenv from "dotenv";
import express from "express";
import { createRequestHandler } from "@remix-run/express";

dotenv.config();
const app = express();
const server = http.createServer(app);

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client"),
);

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

server.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
