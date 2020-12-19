const puppeteer = require("puppeteer");


const tsetmcUrl =
  "http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=7745894403636165";

(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    setTimeout: 10000,
  });
  const page = await browser.newPage();
  await page.goto(tsetmcUrl);
  await page.waitFor(5000);
  const tabs = await page.$$(".menu2 li");
  console.log(tabs.length);
  // navigate all tabs
  for (let tab of tabs) {
      await tab.click();
      await page.waitFor(1000);
    const name = await tab.$eval("a", (el) => el.InnerText);
    console.log(name);
    
  }


  await browser.close();
})();
