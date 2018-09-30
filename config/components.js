"use strict";
const glob = require('glob');
const path = require('path');
const Env = require('./env');
const FileUtils = require('../utils/FileUtils');
const SRC_PATH = Env.SRC_PATH;
const COMPONENTS_PATH = `${SRC_PATH}components/`;
const COMPONENTS_TEMP_PATH = `${SRC_PATH}.components/`;
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
const getNewVersionComponentFilePath = (filePath, ext) => {
    return FileUtils.fixPath(path.resolve(filePath, `../component.${ext}`), false);
};
const readComponentFile = (filePath, ext) => {
    const file = `${filePath}component.${ext}`;
    const content = FileUtils.read(file).split('\n') || [];
    return content.join(`
`) || '';
};
const writeComponentFile = (componentFile, parentDirPath) => {
    const lines = TEMPLATE // readModuleFile(MODULE_TEMPLATE, 'vue')
        .replace(/(\$template)/g, readComponentFile(parentDirPath, 'vue'))
        .replace(/(\$script)/g, readComponentFile(parentDirPath, 'ts'))
        .replace(/(\$style)/g, readComponentFile(parentDirPath, 'scss'))
        .split('\r\n');
    lines.forEach((line, index) => {
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
                const filePath = path.relative(path.resolve(__dirname, `../src/.${parentDirPath.substr(SRC_PATH.length)}`), path.resolve(parentDirPath, fullPath));
                const fixPath = FileUtils.fixPath(filePath, false);
                lines[index] = `${line.substr(0, startIndex)}${fixPath}${line.substr(lastIndex)}`;
            }
        }
    });
    FileUtils.write(componentFile, lines.join('\r\n'));
};
const INDEX_FILES = glob.sync(`${COMPONENTS_PATH}**/index.ts`);
const FILES = (() => {
    const list = [];
    INDEX_FILES.forEach((filePath) => {
        list.push(FileUtils.fixPath(path.resolve(filePath, '..')));
    });
    return list;
})();
function gen(indexFilePath = '') {
    if (indexFilePath) {
        create(indexFilePath);
    }
    else {
        INDEX_FILES.forEach((filePath) => {
            create(filePath);
        });
    }
}
function create(filePath) {
    const scssFile = getNewVersionComponentFilePath(filePath, 'scss');
    if (FileUtils.isExist(scssFile)) {
        const parentDirPath = FileUtils.fixPath(path.resolve(scssFile, '..'));
        const componentTempDir = `${COMPONENTS_TEMP_PATH}${parentDirPath.substr(COMPONENTS_PATH.length)}`;
        FileUtils.mkdir(componentTempDir);
        writeComponentFile(`${componentTempDir}index.vue`, parentDirPath);
    }
    else {
        console.log(filePath, 'is old version component file system.');
    }
}
module.exports = {
    gen, FILES
};
//# sourceMappingURL=components.js.map