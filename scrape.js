const { chromium } = require('playwright');

const seeds = [79,80,81,82,83,84,85,86,87,88];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Visiting:", url);

    await page.goto(url);
    await page.waitForSelector("table"); // wait for table to load

    const numbers = await page.$$eval("table td", tds =>
      tds
        .map(td => parseFloat(td.textContent.trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("FINAL TOTAL SUM =", totalSum);

  await browser.close();
})();
