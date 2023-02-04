const fs = require('fs');
const path = require('path');

const componentsDirectory = 'src/components';

fs.readdir(componentsDirectory, (err, componentDirectories) => {
  if (err) throw err;

  componentDirectories.forEach((componentDirectory) => {
    const componentName = path.basename(componentDirectory);
    const exportedFilePath = `cx/${componentName}.js`;

    const exportedFileCode = `export * from "./components/${componentDirectory}/${componentName}"`;

    fs.writeFile(exportedFilePath, exportedFileCode, (err) => {
      if (err) throw err;
      console.log(`${exportedFilePath} was created`);
    });
  });
});
