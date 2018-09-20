const fs = require('fs');
const shell = require('shelljs');
const fixPath = (filePath: string, isDir: boolean = true) => filePath.replace(/\\/g, '/') + (isDir ? '/' : '');
const read = (file: string) => (fs.readFileSync(file, 'utf8') || '');
const write = (file: string, content: string) => {
  fs.writeFileSync(file, content, 'utf8');
};
const mkdir = (filePath: string) => {
  shell.mkdir('-p', filePath);
};
const rm = (filePath: string) => {
  shell.rm('-rf', filePath);
};
const isExist = (filePath: string) => fs.existsSync(filePath);
module.exports = {
  fixPath,
  read,
  write,
  mkdir,
  rm,
  isExist
};
