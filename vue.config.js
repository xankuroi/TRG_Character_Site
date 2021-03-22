module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/characters/" : "/",
  pages: {
    index: {
      entry: "src/index.js",
      title: "The Reaper's Game Character Sheets",
      weeks: { // [path]: [display name]
        W17: "W17",
        haunted: "Haunted Weekend",
        seoul: "Seoul Weekend",
        W18: "W18",
        lyoko: "Code Lyoko Weekend"
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
      ]
    },
    "Haunted Weekend": {
      entry: "src/main.js",
      title: "Haunted Weekend Characters",
      filename: "haunted/index.html",
      sheetKeys: [
        "2PACX-1vS3o5WiIoMItBrst1IIqHae4PWiqo4OZmL7TcnjmO0oeFhweV0X5N6gyGw9frt1exL7YQYwYjh5i0Wh"
      ]
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
      }
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
      }
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
        Yen: { name: "$" }
      }
    },
  },
};
