const fs = require('fs');
const path = require('path');

const cssFilePath = path.resolve(__dirname, '../styles/css/c-div.attribute.css');
const outputFilePath = path.resolve(
  __dirname,
  '../src/components/div/styles-mapper/styles-mapper.ts'
);

fs.readFile(cssFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const cssMap = new Map();
  const rules = data.match(/([^\{\}]+)(\{[^}]+\})/g);

  rules.forEach((rule) => {
    const [selector, properties] = rule.split('{');
    const value = properties
      .replace(/[\n\r]/g, '')
      .replace(/}/g, '')
      .trim();
    cssMap.set(selector.trim(), value);
  });

  const jsCode = `export const stylesMapper = new Map(${JSON.stringify([...cssMap])});`;
  fs.writeFile(outputFilePath, jsCode, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`CSS rules saved to ${outputFilePath}`);
  });
});

// fs.readFile(cssFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const cssObject = {};
//   const rules = data.match(/([^\{\}]+)(\{[^}]+\})/g);

//   rules.forEach((rule) => {
//     const [selector, properties] = rule.split('{');
//     const value = properties
//       .replace(/[\n\r]/g, '')
//       .replace(/}/g, '')
//       .trim();
//     cssObject[selector.trim()] = value;
//   });

//   const jsCode = `const css = ${JSON.stringify(cssObject)};`;
//   fs.writeFile(outputFilePath, jsCode, 'utf8', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log(`CSS rules saved to ${outputFilePath}`);
//   });
// });
