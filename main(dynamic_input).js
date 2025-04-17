// input should be in line like below:
// {"keys":{"n":4,"k":3},"1":{"base":"10","value":"4"},"2":{"base":"2","value":"111"},"3":{"base":"10","value":"12"},"6":{"base":"4","value":"213"}}

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

try {
  const userInput = prompt("Paste your JSON input:");
  const inputObj = JSON.parse(userInput);
  const result = solve(inputObj);
  console.log("✅ Constant term (f(0)):", result.toString());
} catch (err) {
  console.error("❌ Invalid JSON input:", err.message);
}
