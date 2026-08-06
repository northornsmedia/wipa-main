const fs = require('fs');
let c = fs.readFileSync('src/app/layout.tsx', 'utf8');
const startStr = '<div id="mobile-blocker"';
const endStr = '`}} />';

const startIndex = c.indexOf(startStr);
const endIndex = c.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const finalIndex = endIndex + endStr.length;
  c = c.substring(0, startIndex) + c.substring(finalIndex);
  fs.writeFileSync('src/app/layout.tsx', c);
  console.log("Successfully removed mobile-blocker");
} else {
  console.log("Could not find mobile-blocker markers");
}
