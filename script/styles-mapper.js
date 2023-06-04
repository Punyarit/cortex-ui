const fs = require('fs');
const path = require('path');

const cssFilePath = path.resolve(__dirname, '../styles/css/cx-box.attributes.css');
const outputFilePath = path.resolve(
  __dirname,
  '../src/components/box/styles-mapper/styles-mapper.ts'
);

fs.readFile(cssFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let cssObject = {};
  const rules = data.match(/([^\{\}]+)(\{[^}]+\})/g);

  rules.forEach((rule) => {
    const [selector, properties] = rule.split('{');
    const value = properties
      .replace(/[\n\r]/g, '')
      .replace(/}/g, '')
      .trim();
    cssObject[selector.trim()] = value;
  });

  const jsCode = `export const stylesMapper = ${JSON.stringify(cssObject)};`;
  fs.writeFile(outputFilePath, jsCode, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`CSS rules saved to ${outputFilePath}`);
  });
});
