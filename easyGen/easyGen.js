const fs = require('fs');
const path = require('path');
const FileUtils = require('../utils/FileUtils');
const START_TIME = Date.now();
const config = require('./config');
const modules = config.modules || {};
const components = config.components || [];
const ROOT_DIR = FileUtils.fixPath(path.resolve(__dirname, '..'));
const SRC_DIR = FileUtils.fixPath(path.resolve(ROOT_DIR, 'src'));
const MODULE_DIR = FileUtils.fixPath(path.resolve(SRC_DIR, 'modules'));
const COMPONENT_DIR = FileUtils.fixPath(path.resolve(SRC_DIR, 'components'));

const isUp = c => /[A-Z]/.test(c);

const isNum = c => /[0-9]/.test(c);

const parseClassName = modulePath => {
  const a = modulePath.split('/');
  const b = [];
  a.forEach(item => {
    let v = '';
    for (let i = 0; i < item.length; i++) {
      const s = item.charAt(i);
      if (isNum(s) && !isNum(item.charAt(i - 1))) {
        if (i === 0) {
          b.push(s);
        } else {
          if (v) {
            b.push(v);
          }
          v = s;
        }
      } else if (isUp(s)) {
        if (v) {
          b.push(v);
        }
        v = s.toLowerCase();
      } else {
        v += s;
      }
    }
    if (v) {
      b.push(v);
    }
  });
  return b.join('-');
};

const relativePath = dir => FileUtils.fixPath(path.relative(dir, SRC_DIR));

const genTsFile = (dir, className, isComponent = false) => {
  const key = isComponent ? 'Component' : 'Module';
  const baseClass = `Base${key}`;
  FileUtils.write(`${dir}${key.toLowerCase()}.ts`, `import ${baseClass} from '@/lib/${baseClass}';
class ${key} extends ${baseClass} {
  constructor() {
    super();
    this.setModuleName('${className}');
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...${key}.mapActions([])
    });
    this.setCompute({
      ...${key}.mapGetters({})
    });
    this.setWatch({});
  }
  getData() {
    return {};
  }
  onCreate() {
    super.onCreate(this);
  }
}
export default new ${key}();
`);
};

const genModules = () => {
  Object.keys(modules).forEach(key => {
    const module = modules[key];
    const modulePath = key.startsWith('/') ? key.substr(1) : key;
    const dir = FileUtils.fixPath(path.resolve(MODULE_DIR, `${modulePath}`));
    if (!FileUtils.isExist(`${dir}config.json`)) { // 创建模块
      const moduleTitle = module.title;
      FileUtils.mkdir(dir);
      FileUtils.write(`${dir}config.json`, `{"redirect-url": "/${modulePath}","page-title": "${moduleTitle}"}`);
      const className = parseClassName(`module-${modulePath}`);
      FileUtils.write(`${dir}module.scss`, `@import "${relativePath(dir)}assets/scss/base";
.${className} {}`);
      FileUtils.write(`${dir}module.vue`, `<section class="${className}"></section>`);
      genTsFile(dir, className, false);
      console.log(`Module:${key} 创建完毕`);
    } else {
      console.log(`Module:${key} 已经存在了`);
    }
  });
};

const genComponents = () => {
  components.forEach(component => {
    const componentPath = component.startsWith('/') ? component.substr(1) : component;
    const dir = FileUtils.fixPath(path.resolve(COMPONENT_DIR, `${componentPath}`));
    if (!FileUtils.isExist(`${dir}index.ts`)) {
      FileUtils.mkdir(dir);
      const className = parseClassName(`component-${componentPath}`);
      FileUtils.write(`${dir}index.ts`, `import Component from '@/.components/${componentPath}/index.vue';
export default Component;`);
      FileUtils.write(`${dir}component.scss`, `@import "${relativePath(dir)}assets/scss/base";
.${className} {}`);
      FileUtils.write(`${dir}component.vue`, `<section class="${className}"></section>`);
      genTsFile(dir, className, true);
      const componentTempDir = `${SRC_DIR}.components/${componentPath}/`;
      FileUtils.mkdir(componentTempDir);
      FileUtils.write(`${componentTempDir}index.vue`, '<script>export default {};</script>');
      console.log(`Component:${component} 创建完毕`);
    } else {
      console.log(`Component:${component} 已经存在了`);
    }
  });
};

const resetConfig = () => {
  FileUtils.write(path.resolve(__dirname, './config.json'), `{"modules":{"/index":{"title": "首页"}},"components":["home"]}`);
};

const run = () => {
  genModules();
  genComponents();
  resetConfig();
  console.log(`耗时 ${Date.now() - START_TIME} ms.`);
};

run();
