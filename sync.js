const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./seed.json', 'utf8'));

fetch('http://cms:3000/api/pages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => console.log('CREATED:', JSON.stringify(json, null, 2)))
.catch(err => console.error(err));