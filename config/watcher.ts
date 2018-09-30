const fs = require('fs');
const writer = require('./writer');
const components = require('./components');
const EXT_LIST = ['ts', 'vue', 'scss'];

class Page {
  static listener(file: string, parent: string) {
    return (curr: any, prev: any) => {
      writer.writeModule(file, parent);
    };
  }

  static getFilePath(parent: string, ext: string) {
    return `${parent}module.${ext}`;
  }

  static watch(file: string, parent: string, ext: string) {
    fs.watchFile(Page.getFilePath(parent, ext), Page.listener(file, parent));
  }

  static watcher(pages: any) {
    Object.keys(pages).forEach((key: string) => {
      const page: any = pages[key];
      const moduleInfo: any = page.moduleInfo;
      const file: string = moduleInfo.file;
      const parent: string = moduleInfo.parent;
      EXT_LIST.forEach((ext: string) => {
        Page.watch(file, parent, ext);
      });
    });
  }
}

class Component {
  static listener(filePath: string, parent: string) {
    return (curr: any, prev: any) => {
      components.gen(`${parent}index.ts`);
    };
  }

  static getFilePath(parent: string, ext: string) {
    return `${parent}component.${ext}`;
  }

  static watch(filePath: string, parent: string) {
    fs.watchFile(filePath, Component.listener(filePath, parent));
  }

  static watcher(files: Array<string>) {
    files.forEach((parent: string) => {
      console.log(parent);
      EXT_LIST.forEach((ext: string) => {
        switch (ext) {
          case 'ts':
            Component.watch(`${parent}index.${ext}`, parent);
            Component.watch(Component.getFilePath(parent, ext), parent);
            break;
          default:
            Component.watch(Component.getFilePath(parent, ext), parent);
            break;
        }
      });
    });
  }
}

module.exports = {Page, Component};
