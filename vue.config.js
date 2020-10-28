module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/characters/" : "/",
  pages: {
    index: {
      entry: "src/index.js",
      title: "The Reaper's Game Character Sheets",
      weeks: ["W17"],
    },
    "Test Page": {
      entry: "src/main.js",
      title: "Test Page",
      filename: "test/index.html",
      playerKey:
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ",
      reaperKey:
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ",
    },
    "W17 Characters": {
      entry: "src/main.js",
      title: "W17 Characters",
      filename: "W17/index.html",
      playerKey:
        "2PACX-1vQ9mahGpwePTKAx8tV8qAM43iY-2VgxPFSG_gL-seTTifV-HNxcOrHm8FYvm8a4gU02HLULbnCwvzhp",
      reaperKey:
        "2PACX-1vQykYWNZ5q269yQrpIj3Ai6wJ2HM2qvu_1CC53LDl-gJOfki72Vq28DYP-mcz-6RXbKBnNrSlflcugI",
    },
    "Haunted Weekend": {
      entry: "src/main.js",
      title: "Haunted Weekend Characters",
      filename: "haunted/index.html",
      playerKey:
        "2PACX-1vS3o5WiIoMItBrst1IIqHae4PWiqo4OZmL7TcnjmO0oeFhweV0X5N6gyGw9frt1exL7YQYwYjh5i0Wh"
    },
  },
};
