const express = require("express");
const NodeMediaServer = require("node-media-server");

// Cargar variables de entorno
require("dotenv").config();

// conectar a DB
require("./config/db");

// Create a new express application instance
const app = express();
app.use(express.json());

app.use("/users", require("./users/routes"));
app.use("/tournamets", require("./tournamets/routes"));
app.use("/pirlo", require("./prlotv.fr/routes"));
app.use("/matches", require("./matches/routes"));

app.listen(process.env.APP_PORT, () =>
  console.log("Servidor escuchando en el puerto " + process.env.APP_PORT)
);
const config = {
  rtmp: {
    port: 1935,
    chunck_size: 60000,
    go_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg:
      "C:/Users/aitonika/Documents/ffmpeg-5.1.2-essentials_build/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        vc: "copy",
        vcParam: [],
        ac: "aac",
        acParam: ["-ab", "64k", "-ac", "1", "-ar", "44100"],
        rtmp: true,
        rtmpApp: "live2",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:windows_size=3:extra_windows_size=5]",
      },
    ],
  },
};

const nms = new NodeMediaServer(config);
nms.run();
module.exports = app;
