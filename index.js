const ArbNumber = require("./arb-number");

const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+_=-}{][\":';?>/.<,";

let tests = 0,
  blank = "          ",
  defaultMax = 1024,
  max = parseInt(process.argv[2] || defaultMax.toString()),
  matches = 0;
if (isNaN(max)) {
  max = defaultMax;
}
if (max < 1) {
  max = Number.MAX_SAFE_INTEGER;
}

function status(msg) {
  process.stdout.write(`\r${blank}\r${msg}`);
}

let num = new ArbNumber(chars, () => blank += " ");
function _foundResultContaining(search) {
  num.increment();
  const
    test = num.value,
    buffer = Buffer.from(test),
    encoded = buffer.toString("base64");

  status(`testing: ${test}`);
  const result = encoded.indexOf(search) > -1;
  if (result) {
    status("");
    const rate = ((100 * matches) / tests).toFixed(0);
    console.log(`[match rate: ${rate} %] :: ${test} -> ${encoded}`);
  }
  return result;
}

while (++tests) {
  if (_foundResultContaining("+")) {
    matches++;
  }
  if (matches > max) {
    process.exit(0);
  }
}
