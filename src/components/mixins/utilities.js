export const toast = {
  methods: {
    toast(name) {
      this.$toasted.show(`Copied ${name}'s stats!`, {
        duration: 1500,
      });
    },
  },
};

export const publicPath = {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};

export const isPlayer = {
  methods: {
    isPlayer(data) {
      return data.Role === "Player";
    },
  },
};

export const brandData = {
  data() {
    return {
      hasLogo: [
        "Mus Rattus",
        "D+B",
        "Tigre Punks",
        "Lapin Angelique",
        "Dragon Couture",
        "Hip Snake",
        "Pegaso",
        "Sheep Heavenly",
        "JotM",
        "Pavo Real",
        "Natural Puppy",
        "Wild Boar",
        "Gatito",
      ],
      colors: {
        "Mus Rattus": "#fceb32",
        "D+B": "#fc91e7",
        "Tigre Punks": "#ff7e00",
        "Lapin Angelique": "#ffceec",
        "Dragon Couture": "#d6ffab",
        "Hip Snake": "#e8d2f8",
        Pegaso: "#e2e2e2",
        "Sheep Heavenly": "#87a1ed",
        JotM: "#ffd016",
        "Pavo Real": "#e4ffd8",
        "Natural Puppy": "#cdfbff",
        "Wild Boar": "#ffcf4f ",
        Gatito: "#ffb629",
        "Unbranded Misc": "#eebb33",
        "Sea★Angel": "lightblue",
        "Solid Scorpion": "#78bf87",
      },
      fontColors: {
        "Sea★Angel": "#0b5da2",
        "Solid Scorpion": "#195c29",
      },
      fontFamilies: {
        "Sea★Angel": "Quicksand",
        "Solid Scorpion": "Girassol",
      },
    };
  },
};
