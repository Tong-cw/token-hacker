const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\Administrator\\token-hacker\\lib\\translations.ts', 'utf8');
const lines = c.split('\n');
let ok = 0, fail = 0;
lines.forEach((l, i) => {
  const t = l.trim();
  if (!t.startsWith('content:')) return;
  const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
  const isArticleBoundary = nextLine.startsWith("'why") || nextLine.startsWith("'model") || nextLine.startsWith("'migrate") || nextLine.startsWith('}');
  const onOneLine = isArticleBoundary; // content line ends before next article
  const startsQuoted = t.startsWith("content: '");
  const endsQuotedComma = t.endsWith("',");
  const status = (onOneLine && startsQuoted && endsQuotedComma) ? '✓' : '✗';
  if (status === '✓') ok++; else fail++;
  console.log(`Line ${i+1}: ${status} singleLine=${onOneLine} startsOk=${startsQuoted} endsOk=${endsQuotedComma}`);
});
console.log(`\nTotal: ${ok} passed, ${fail} failed`);
