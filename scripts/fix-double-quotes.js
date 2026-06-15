const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Administrator\\token-hacker\\lib\\translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

// First, fix the already-applied EN_MIGRATE_CONTENT which has double quotes
// (It was already written; we need to fix all of them)
// Instead, let's re-read and fix all double-quote issues

// The pattern: ''<h2>... should be '<h2>... and </p>'' should be </p>'
// Fix: replace '' (double opening) with ' (single opening) at content: boundaries
// and replace '' (double closing after </p>) with '

// Actually, simpler fix: re-read the file, find all content: lines, and fix double quotes
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (trimmed.startsWith("content: ''")) {
    // Fix double opening quote: content: ''... → content: '...
    lines[i] = lines[i].replace("content: ''", "content: '");
    console.log(`Fixed double quote at line ${i+1}`);
  }
}

content = lines.join('\n');

// Now fix the closing: find patterns where HTML ends with '</p>'' and fix to '</p>'
// The issue is content: '...HTML...</p>'', → should be content: '...HTML...</p>',
content = content.replace(/<\/p>''\s*,/g, "</p>',");
// Also for other HTML tags at end
content = content.replace(/<\/code>''\s*,/g, "</code>',");
content = content.replace(/<\/pre>''\s*,/g, "</pre>',");
content = content.replace(/<\/ul>''\s*,/g, "</ul>',");
content = content.replace(/<\/ol>''\s*,/g, "</ol>',");
content = content.replace(/<\/blockquote>''\s*,/g, "</blockquote>',");

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Double quote fix applied!');
