const env = require('./env');
const components = require('./components');
const pages = require('./pages');
const watcher = require('./watcher');

components();

if (env.IS_DEV) {
  watcher.Page.watcher(pages);
}

module.exports = {
  pages
};
