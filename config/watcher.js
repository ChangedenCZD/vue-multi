"use strict";
const fs = require('fs');
const writer = require('./writer');
const EXT_LIST = ['js', 'vue', 'scss'];
const listener = (file, parent) => {
    return (curr, prev) => {
        writer.writeModule(file, parent);
    };
};
const getFilePath = (parent, ext) => {
    return `${parent}module.${ext}`;
};
const watch = (file, parent, ext) => {
    fs.watchFile(getFilePath(parent, ext), listener(file, parent));
};
const watcher = (pages) => {
    Object.keys(pages).forEach((key) => {
        const page = pages[key];
        const moduleInfo = page.moduleInfo;
        const file = moduleInfo.file;
        const parent = moduleInfo.parent;
        EXT_LIST.forEach((ext) => {
            watch(file, parent, ext);
        });
    });
};
module.exports = watcher;
//# sourceMappingURL=watcher.js.map