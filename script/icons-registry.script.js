const fs = require('fs');
const path = require('path');

const assetsDir = './assets/icons';

const css = [];

fs.readdirSync(assetsDir).forEach((type) => {
  const typeDir = path.join(assetsDir, type);
  fs.readdirSync(typeDir).forEach((icon) => {
    const name = path.basename(icon, '.woff2');
    css.push(`@font-face {
  font-family: '${name}-${type}';
  src: url('../../assets/icons/${type}/${icon}') format('woff2');
}`);
  });
});

fs.writeFileSync('styles/dev/icons-registry.css', css.join('\n'));
console.log('icon.css file created successfully!');
