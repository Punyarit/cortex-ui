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

const output = `export const iconSources = [${iconnames.join(',')}] as const;`;

fs.writeFileSync('src/components/icon/types/icon.src.ts', output);
console.log('iconnames.ts file created successfully!');
