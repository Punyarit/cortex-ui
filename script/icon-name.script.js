const fs = require('fs');
const path = require('path');

const assetsDir = './assets/icons';

const iconnames = [];

fs.readdirSync(assetsDir).forEach((type) => {
  const typeDir = path.join(assetsDir, type);
  fs.readdirSync(typeDir).forEach((icon) => {
    const name = path.basename(icon, '.woff2');
    iconnames.push(`'${name}-${type}'`);
  });
});

const output = `const iconnames = [${iconnames.join(',')}];
export default iconnames;`;

fs.writeFileSync('./icon.src.ts', output);
console.log('iconnames.ts file created successfully!');
