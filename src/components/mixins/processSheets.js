import XLSX from "xlsx";

export async function processSpreadsheet(url) {
  return fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error("Failed to load data.");
      return resp.arrayBuffer();
    })
    .then(buffer => {
      const arrBuffer = new Uint8Array(buffer);
      return XLSX.read(arrBuffer, { type: "array" }).Sheets;
    })
    .then(sheets => {
      // Base data
      const sheetConfig = XLSX.utils.sheet_to_json(sheets.Config);
      const Pins = keyData(sheets.Pins);
      const Threads = keyData(sheets.Threads);
      const Food = keyData(sheets.Food);

      // Ignored sheet regex
      const partialMatch = sheetConfig[1].UNSEEN.split(",")
        .map(str => str.trim())
        .join("|");
      const exactMatch = sheetConfig[0].UNSEEN.split(",")
        .map(str => str.trim())
        .join("$|^");
      const ignoRe = new RegExp(`${partialMatch}|^${exactMatch}$`);

      // Process the character sheets
      const cSheets = Object.keys(sheets)
        .filter(key => !ignoRe.test(key))
        .map(key =>
          processCharacterData(sheets[key], sheetConfig, {
            Pins,
            Threads,
            Food
          })
        );

      return {
        Pins,
        Threads,
        Food,
        sheets: cSheets
      };
    });
}

function keyData(rawSheet) {
  let data = {};
  XLSX.utils
    .sheet_to_json(rawSheet)
    .filter(row => row["Name"])
    .forEach(row => (data[row["Name"]] = row));
  return data;
}

function processCharacterData(sheet, config, lookup) {
  let data = { Noise: {} };
  config.forEach(field => {
    const fieldData = processField(sheet, field, lookup);

    if (field.NAME.startsWith("Noise")) {
      data.Noise[field.NAME.substring(6)] = fieldData;
    } else {
      data[field.NAME] = fieldData;
    }
  });

  // Group items by equipped
  data.Pins = groupEquip(data.Pins);
  data.Threads = groupEquip(data.Threads);
  // TODO generate equipment stats

  // Additional color parsing
  let hex = data.Color;
  data.Color = {};
  if (hex) {
    hex = hex.match(/([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    if (hex) {
      data.Color = { color: "#" + hex[0] };
    }
  }
  // TODO generate C/P
  return data;
}

function groupEquip(items) {
  return items.reduce(
    (acc, curr) => {
      if (curr.n) {
        acc["equipped"].push(curr);
      } else {
        acc["unequipped"].push(curr);
      }
      return acc;
    },
    { equipped: [], unequipped: [] }
  );
}

const coordRegex = new RegExp(/[a-z]+|\d+/gi);
function offsetCoord(coord, rowOffset, colOffset) {
  let [col, row] = coord.match(coordRegex);
  // WARNING: doesn't handle Z -> AA transition
  if (colOffset) {
    col = String.fromCharCode(col.charCodeAt(0) + colOffset);
  }
  if (rowOffset) {
    row = Number(row) + rowOffset;
  }
  return col + row;
}

function processField(sheet, field, lookup) {
  if (!field.LEN) {
    // standard processing
    return sheet[field.COORD] ? sheet[field.COORD].w : "";
  }
  // special processing
  let data;
  const num = Number(field.LEN);
  const coord = field.COORD;

  if (num) {
    // numeric LEN, so this is inventory
    const nOffset = Number(field.N);
    const dOffset = Number(field.D);
    data = [];
    for (let i = 0; i < num; i++) {
      const name = sheet[offsetCoord(coord, i, 0)];
      if (name) {
        let datum = { name: name.w };
        if (lookup[field.NAME]) {
          datum = lookup[field.NAME][name.w];
          if (!datum) {
            continue;
          }
        }
        if (nOffset) {
          const n = sheet[offsetCoord(coord, i, nOffset)];
          if (n) {
            datum.n = n.v;
          }
        }
        if (dOffset) {
          const d = sheet[offsetCoord(coord, i, dOffset)];
          if (d) {
            datum.d = d.v;
          }
        }
        data.push(datum);
      }
    }
  } else {
    // non-numeric LEN, so these are stats
    data = {
      raw: sheet[coord].v,
      misc: sheet[offsetCoord(coord, Number(field.N), 0)].v,
      trained: sheet[offsetCoord(coord, Number(field.D), 0)].v
    };
    if (field.NAME === "HP") {
      data.current = data.trained;
    }
  }
  return data;
}
