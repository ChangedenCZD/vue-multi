"use strict";
const env = require('./env');
const components = require('./components');
const pages = require('./pages');
const watcher = require('./watcher');
components();
if (env.IS_DEV) {
    watcher(pages);
}
module.exports = {
    pages
};
//# sourceMappingURL=index.js.map