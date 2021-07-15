module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/characters/" : "/",
  pages: {
    index: {
      entry: "src/index.js",
      title: "The Reaper's Game Character Sheets",
      weeks: { // [path]: [display name]
        W17: "W17",
        haunted: "Haunted Weekend",
        seoul: "Seoul Weekend (1)",
        W18: "W18",
        lyoko: "Code Lyoko Weekend",
        seoul2: "Seoul Weekend (2)",
        W19: "W19"
      }
    },
    "Test Page": {
      entry: "src/main.js",
      title: "Test Page",
      filename: "test/index.html",
      sheetKeys: [
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ"
      ]
    },
    "W17 Characters": {
      entry: "src/main.js",
      title: "W17 Characters",
      filename: "W17/index.html",
      sheetKeys: [
        "2PACX-1vQ9mahGpwePTKAx8tV8qAM43iY-2VgxPFSG_gL-seTTifV-HNxcOrHm8FYvm8a4gU02HLULbnCwvzhp",
        "2PACX-1vQykYWNZ5q269yQrpIj3Ai6wJ2HM2qvu_1CC53LDl-gJOfki72Vq28DYP-mcz-6RXbKBnNrSlflcugI",
      ],
      legacyItemImages: true
    },
    "Haunted Weekend": {
      entry: "src/main.js",
      title: "Haunted Weekend Characters",
      filename: "haunted/index.html",
      sheetKeys: [
        "2PACX-1vS3o5WiIoMItBrst1IIqHae4PWiqo4OZmL7TcnjmO0oeFhweV0X5N6gyGw9frt1exL7YQYwYjh5i0Wh"
      ],
      legacyItemImages: true
    },
    "Seoul Weekend": {
      entry: "src/main.js",
      title: "Seoul Characters",
      filename: "seoul/index.html",
      sheetKeys: [
        "2PACX-1vTQLr_2U1IFu0fN-JVBNLcBJt9Aja_2jMHk7k6qiqaWRNqGOsalTe-F-Bq8_ttbZyvXdmcsIE-ci7Ey"
      ],
      overrides: {
        Yen: { name: "₩" }
      },
      legacyItemImages: true
    },
    "Week 18": {
      entry: "src/main.js",
      title: "Week 18 (Chicago) Characters",
      filename: "W18/index.html",
      sheetKeys: [
        "2PACX-1vTDCzoqPnaSogrZxgnSUxRAgFzNMRbog9w9UArI132tBXYAR0PwTNII0ge4NTpiAWxyvfvavZDcDzlA"
      ],
      overrides: {
        Yen: { name: "$" }
      },
      legacyItemImages: true
    },
    "Code Lyoko": {
      entry: "src/main.js",
      title: "Code Lyoko Characters",
      filename: "lyoko/index.html",
      sheetKeys: [
        "2PACX-1vR1jiRpXTIuuNHmV4GwcAQA7UcgUN-sW-jm5Lc3jResxRRQKc8Diop4f2ivJ0CQAigUYtjym4MKUAbT"
      ],
      overrides: {
        SYNC: { name: "SPD" },
        Yen: { name: "$" },
        PP: { name: "EXP" },
        hidePlayerBlock: true,
        enableNoiseBlockForPlayers: true
      }
    },
    "Seoul Weekend 2": {
      entry: "src/main.js",
      title: "Seoul Characters (2)",
      filename: "seoul2/index.html",
      sheetKeys: [
        "2PACX-1vQtgjd9RGFEd2p9wYQd7kFpVW2DYpAzPGL5b5xtzybeO0m7pSonBJSKcWt3-IBI-4HDqmO0F9kzPkJ2"
      ],
      overrides: {
        Yen: { name: "₩" }
      }
    },
    "Week 19": {
      entry: "src/main.js",
      title: "Week 19 Characters",
      filename: "W19/index.html",
      sheetKeys: [
        "2PACX-1vQ-xmqo11pUYYzajjyjmOZoTKuVPRDlDWjXX4pfBcnbYkGslslONfXCC9DrztCIUhCGsa1Sz6Rgbr5Y"
      ],
      additionalLinks: {
        "Data": "https://docs.google.com/spreadsheets/d/1Ot8C6djwjiUK204VCdaUrSa1IoiTvQneqmiEylq134g",
        "Rank-up Objectives": "https://soseido.carrd.co",
      }
    },
  },
};
