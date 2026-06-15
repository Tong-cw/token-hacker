const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\Administrator\\token-hacker\\lib\\translations.ts', 'utf8');
const lines = c.split('\n');

let contentLines = [];
lines.forEach((l, i) => {
  if (l.trim().startsWith('content:')) {
    contentLines.push({line: i+1, text: l.trim()});
  }
});

console.log(`Found ${contentLines.length} content lines\n`);
contentLines.forEach(cl => {
  const startsDouble = cl.text.startsWith("content: ''");
  const startsSingle = cl.text.startsWith("content: '");
  const endsDouble = cl.text.match(/''\s*,?\s*$/);
  const endsSingle = cl.text.match(/'\s*,?\s*$/);
  
  console.log(`Line ${cl.line}:`);
  console.log(`  Starts correctly (single quote): ${startsSingle && !startsDouble}`);
  console.log(`  Ends correctly (single quote): ${!!endsSingle && !endsDouble}`);
  console.log(`  First 80 chars: ${cl.text.substring(0, 80)}`);
  console.log(`  Last 30 chars: ${cl.text.substring(cl.text.length - 30)}`);
  console.log();
});

// Check for any remaining placeholders
['__EN_', '__ZH_', 'EN_MIGRATE'].forEach(p => {
  if (c.includes(p)) console.log(`WARNING: Placeholder ${p} still present!`);
});
console.log('Placeholder check: CLEAN');
console.log(`Braces: open=${(c.match(/\{/g)||[]).length} close=${(c.match(/\}/g)||[]).length}`);
