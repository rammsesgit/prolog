const routes = require('next-routes')

//   url name  | custom name  |  page.js
module.exports = routes()
  .add('index')
  .add('nani-search', '/nani-search', 'naniSearch')
