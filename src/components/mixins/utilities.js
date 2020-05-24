export const publicPath = {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};

export const color = {
  computed: {
    color() {
      let hex = this.rawColor;
      if (hex) {
        hex = hex.match(/([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
        if (hex) {
          return { color: "#" + hex[0] };
        }
      }
      return {};
    }
  }
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
        "Gatito"
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
        "Sea★Angel": "lightblue"
      },
      fontColors: {
        "Sea★Angel": "#0b5da2"
      },
      fontFamilies: {
        "Sea★Angel": "Quicksand"
      }
    };
  }
};
