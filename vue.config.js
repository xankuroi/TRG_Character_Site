module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/characters/" : "/",
  pages: {
    index: {
      entry: "src/index.js",
      title: "The Reaper's Game Character Sheets",
      weeks: ["W15", "W16", "W17"]
    },
    "W17 Players": {
      entry: "src/main.js",
      filename: "W17/players.html",
      title: "W17 Players",
      publishKey:
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ"
    },
    "W17 Reapers": {
      entry: "src/main.js",
      filename: "W17/reapers.html",
      title: "W17 Reapers",
      publishKey:
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ"
    }
  }
};
