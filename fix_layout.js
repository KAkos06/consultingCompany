const fs = require('fs');
let layout = fs.readFileSync('frontend/app/layout.tsx', 'utf8');
layout = layout.replace(/description: ".*?",/, 'description: "Céges honlap",');
fs.writeFileSync('frontend/app/layout.tsx', layout, 'utf8');