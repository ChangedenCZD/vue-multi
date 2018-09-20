"use strict";
const env = require('./env');
const pages = require('./pages');
const watcher = require('./watcher');
if (env.IS_DEV) {
    watcher(pages);
}
module.exports = {
    pages
};
//# sourceMappingURL=index.js.map