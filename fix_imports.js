const fs = require('fs');
const path = require('path');

const dir = 'frontend/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // 1. react-router-dom to next/link
  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s+\{\s*Link.*?\s*\}\s+from\s+['"]react-router-dom['"];?/g, 'import Link from "next/link";');
    changed = true;
  }

  // 2. Link to= to href=
  if (content.includes('<Link')) {
    content = content.replace(/<Link([^>]*?)to=/g, '<Link=');
    changed = true;
  }

  // 3. Add use client to files using hooks
  if (!content.startsWith('"use client";') && !content.startsWith("'use client';") && (content.includes('useState') || content.includes('useEffect') || content.includes('useRef'))) {
    content = '"use client";\n' + content;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
  }
});