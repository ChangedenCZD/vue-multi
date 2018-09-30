const path = require('path');
const FileUtils = require('../utils/FileUtils');
const env = require('./env');
// const MODULE_TEMPLATE = env.MODULE_TEMPLATE;
const SINGLE = '\'';
const DOUBLE = '\"';
const TEMPLATE = `<template>
  $template
</template>

<script>
  $script
</script>

<style lang="scss" scoped="true">
  $style
</style>`;

const readModuleFile = (filePath: string, ext: string) => {
  const file: string = `${filePath}module.${ext}`;
  const content = FileUtils.read(file).split('\n') || [];
  return content.join(`
`) || '';
};

const writeFile = (filePath: string, content: string) => {
  FileUtils.write(filePath, content);
};

const writeModuleFile = (moduleFile: string, parentDirPath: string) => {
  const lines = TEMPLATE// readModuleFile(MODULE_TEMPLATE, 'vue')
    .replace(/(\$template)/g, readModuleFile(parentDirPath, 'vue'))
    .replace(/(\$script)/g, readModuleFile(parentDirPath, 'ts'))
    .replace(/(\$style)/g, readModuleFile(parentDirPath, 'scss'))
    .split('\r\n');
  lines.forEach((line: string, index: number) => {
    if (/(\.\/)/g.test(line)) {
      const s = line.split('./') || [];
      const length = s.length - 1;
      if (length > 0) {
        const singleLastIndex = line.lastIndexOf(SINGLE);
        const doubleLastIndex = line.lastIndexOf(DOUBLE);
        const isDouble = singleLastIndex < doubleLastIndex;
        const lastIndex = isDouble ? doubleLastIndex : singleLastIndex;
        const startIndex = line.lastIndexOf(isDouble ? DOUBLE : SINGLE, lastIndex - 1) + 1;
        const fullPath = line.substring(startIndex, lastIndex);
        const fixPath = '../' + FileUtils.fixPath(path.relative(path.resolve(__dirname, '../src/.modules'), path.resolve(parentDirPath, fullPath)), false);
        lines[index] = `${line.substr(0, startIndex)}${fixPath}${line.substr(lastIndex)}`;
      }
    }
  });
  writeFile(moduleFile, lines.join('\r\n'));
};

const writeEntryContent = (entryFile: string, key: string) => {
  writeFile(entryFile, `// ${new Date()}
import App from '../../main';
import Module from './${key}.vue'
App(Module);`);
};

module.exports = {
  writeModule: writeModuleFile,
  writeEntry: writeEntryContent
};
