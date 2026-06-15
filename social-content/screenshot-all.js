const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const htmlDir = 'C:\\Users\\Administrator\\token-hacker\\social-content\\output-images';
const pngDir = path.join(htmlDir, 'png');
if (!fs.existsSync(pngDir)) fs.mkdirSync(pngDir);

const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

async function screenshotAll() {
  const browser = await puppeteer.launch({ headless: true });
  
  for (const file of files) {
    const filePath = path.join(htmlDir, file);
    const name = file.replace('.html', '');
    
    // Determine dimensions from filename
    let width = 1200, height = 675; // default X
    if (file.startsWith('ig-')) { width = 1080; height = 1080; }
    if (file.startsWith('tk-')) { width = 1080; height = 1920; }
    
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(pngDir, name + '.png'), fullPage: false });
    await page.close();
    
    console.log(`✓ ${name}.png (${width}x${height})`);
  }
  
  await browser.close();
  console.log(`\nDone! ${files.length} images saved to output-images/png/`);
}

screenshotAll().catch(err => { console.error(err); process.exit(1); });
