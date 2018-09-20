const fs = require('fs');
const writer = require('./writer');
const EXT_LIST = ['js', 'vue', 'scss'];
const listener = (file: string, parent: string) => {
  return (curr: any, prev: any) => {
    writer.writeModule(file, parent);
  };
};
const getFilePath = (parent: string, ext: string) => {
  return `${parent}module.${ext}`;
};
const watch = (file: string, parent: string, ext: string) => {
  fs.watchFile(getFilePath(parent, ext), listener(file, parent));
};
const watcher = (pages: any) => {
  Object.keys(pages).forEach((key: string) => {
    const page: any = pages[key];
    const moduleInfo: any = page.moduleInfo;
    const file: string = moduleInfo.file;
    const parent: string = moduleInfo.parent;
    EXT_LIST.forEach((ext: string) => {
      watch(file, parent, ext);
    });
  });
};
module.exports = watcher;
