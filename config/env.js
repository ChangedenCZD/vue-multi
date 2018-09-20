"use strict";
const path = require('path');
const FileUtils = require('../utils/FileUtils');
const ENV = process.env.NODE_ENV;
const IS_DEV = ENV === 'development';
const ROOT_PATH = FileUtils.fixPath(path.resolve(__dirname, '../'));
const SRC_PATH = FileUtils.fixPath(path.resolve(ROOT_PATH, 'src'));
const ENTRY_ROOT = FileUtils.fixPath(path.resolve(SRC_PATH, `.modules/${ENV}`));
const MODULE_TEMPLATE = FileUtils.fixPath(path.resolve(SRC_PATH, '.template/'));
module.exports = {
    ENV,
    IS_DEV,
    ROOT_PATH,
    SRC_PATH,
    ENTRY_ROOT,
    MODULE_TEMPLATE
};
//# sourceMappingURL=env.js.map