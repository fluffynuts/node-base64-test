(async function() {
  async function sleep(ms) {
      return new Promise(resolve => {
          setTimeout(resolve, ms);
      });
  }
  const blank = "       ";
  for (let i = 1000; i < 10000; i++) {
      process.stdout.write(`\r${blank}\r${i}`);
      await sleep(50);
  }
})();