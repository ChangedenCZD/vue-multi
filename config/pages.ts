const glob = require('glob');
const path = require('path');
const md5 = require('md5');
const writer = require('./writer');
const FileUtils = require('../utils/FileUtils');
const env = require('./env');
const ROOT_PATH = env.ROOT_PATH;
const moduleTemporaryFolder = env.ENTRY_ROOT;
const configFile = glob.sync(path.resolve(ROOT_PATH, 'src/modules/**/config.json'));
const pages: any = {};

class Page {
  entry: string;
  template: string = 'public/index.html';
  title: string;
  filename: string;
  chunks: Array<string>;
  moduleInfo: any;

  constructor(entry: string, entryJs: string, title: string, moduleFile: string, parentDirPath: string) {
    this.entry = entryJs;
    this.title = title;
    this.filename = `${entry}.html`;
    this.chunks = ['chunk-vendors', 'chunk-common', entry];
    this.moduleInfo = {
      file: moduleFile,
      parent: parentDirPath
    };
  }
}

FileUtils.rm(moduleTemporaryFolder.endsWith('/') ? moduleTemporaryFolder.substr(0, moduleTemporaryFolder.length - 1) : moduleTemporaryFolder);
FileUtils.mkdir(moduleTemporaryFolder);
configFile.forEach((filePath: string) => {
  const config = require(filePath);
  let entry: string = config['redirect-url'];
  if (entry.startsWith('/')) {
    entry = entry.substr(1);
  }
  const title = config['page-title'];
  const parentDirPath = FileUtils.fixPath(path.resolve(filePath, '../'));
  const key = md5(entry);
  const moduleFile = `${moduleTemporaryFolder}${key}.vue`;
  const entryFile = `${moduleTemporaryFolder}${key}.js`;
  writer.writeModule(moduleFile, parentDirPath);
  writer.writeEntry(entryFile, key);
  pages[entry] = new Page(entry, entryFile, title, moduleFile, parentDirPath);
});
module.exports = pages;
