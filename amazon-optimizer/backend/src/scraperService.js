const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

async function fetchProductDetails(asin) {
  const url = `https://www.amazon.com/dp/${asin}`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set user agent to mimic a real browser
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log('Current Page URL:', page.url());

    // Optional: save page for debugging
    // const html = await page.content();
    // fs.writeFileSync(`page_${asin}.html`, html);

    await page.waitForSelector('#productTitle', { timeout: 30000 });

    const productData = await page.evaluate(() => {
      const title = document.getElementById('productTitle')?.innerText.trim() || '';
      const bullets = Array.from(document.querySelectorAll('#feature-bullets ul li'))
        .map(li => li.innerText.trim());
      const description = document.getElementById('productDescription')?.innerText.trim() || '';
      return { title, bullets, description };
    });

    if (!productData.title) {
      throw new Error('Invalid or unavailable ASIN. Please check the ASIN and try again.');
    }

    return {
      asin: asin.toUpperCase(),
      original_title: productData.title,
      original_bullets: productData.bullets,
      original_description: productData.description,
    };

  } catch (error) {
    // Throw with custom message if not already set
    if (error.message.includes('Invalid or unavailable ASIN')) {
      throw error;
    }
    throw new Error('Invalid or unavailable ASIN. Please check the ASIN and try again.');
  } finally {
    await browser.close();
  }
}

module.exports = {
  fetchProductDetails,
};
