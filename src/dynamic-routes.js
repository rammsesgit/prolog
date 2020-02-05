const routes = require('next-routes');

//   url name  | custom name  |  page.js
module.exports = routes()
  .add('index')
  .add('channel', '/:slug.:id', 'channel')
  .add('podcast', '/slugChannel.:idChannel/:slug.:id', 'podcast')