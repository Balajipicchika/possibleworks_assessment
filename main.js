function decodeValue(base, value) {
  return BigInt(parseInt(value, parseInt(base)));
}

function lagrangeInterpolation(x, y, at = 0n) {
  const k = x.length;
  let result = 0n;

  for (let j = 0; j < k; j++) {
    let term = y[j];
    for (let i = 0; i < k; i++) {
      if (i !== j) {
        term = term * (at - x[i]) / (x[j] - x[i]);
      }
    }
    result += term;
  }

  return result;
}

function solve(input) {
  const keys = input["keys"];
  const k = keys["k"];

  const points = [];

  for (let key in input) {
    if (key === "keys") continue;
    const x = BigInt(key);
    const base = input[key]["base"];
    const value = input[key]["value"];
    const y = decodeValue(base, value);
    points.push([x, y]);
  }

  points.sort((a, b) => (a[0] < b[0] ? -1 : 1));

  const x = points.slice(0, k).map(p => p[0]);
  const y = points.slice(0, k).map(p => p[1]);

  return lagrangeInterpolation(x, y, 0n);
}

const input1 = {
  "keys": { "n": 4, "k": 3 },
  "1": { "base": "10", "value": "4" },
  "2": { "base": "2", "value": "111" },
  "3": { "base": "10", "value": "12" },
  "6": { "base": "4", "value": "213" }
};

const input2 = {
  "keys": { "n": 10, "k": 7 },
  "1": { "base": "6", "value": "13444211440455345511" },
  "2": { "base": "15", "value": "aed7015a346d63" },
  "3": { "base": "15", "value": "6aeeb69631c227c" },
  "4": { "base": "16", "value": "e1b5e05623d881f" },
  "5": { "base": "8", "value": "316034514573652620673" },
  "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
  "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
  "8": { "base": "6", "value": "20220554335330240002224253" },
  "9": { "base": "12", "value": "45153788322a1255483" },
  "10": { "base": "7", "value": "1101613130313526312514143" }
};

console.log("Constant term - Test Case 1:", solve(input1).toString());
console.log("Constant term - Test Case 2:", solve(input2).toString());

