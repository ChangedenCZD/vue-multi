const env = require('./env');
const components = require('./components');
const pages = require('./pages');
const watcher = require('./watcher');

components.gen();

if (env.IS_DEV) {
  watcher.Component.watcher(components.FILES);
  watcher.Page.watcher(pages);
}

module.exports = {
  pages
};
