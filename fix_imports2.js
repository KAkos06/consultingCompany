const fs = require('fs');
const path = require('path');

const dir = 'frontend/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  if (content.includes('<Link=')) {
    content = content.replace(/<Link=/g, '<Link href=');
    changed = true;
  }
  
  if (content.includes('<Link href=')) {
    // Wait, if there are multiple spaces, just fix it
    content = content.replace(/<Link\s*href=/g, '<Link href=');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
  }
});