const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\Administrator\\token-hacker\\lib\\translations.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  const lo = l.toLowerCase();
  if ((lo.includes("zh:") && l.includes('{')) || (lo.includes('content:') && i > 700)) 
    console.log(i+1, l.substring(0,100));
});
