const next = require('next')
const routes = require('./dynamic-routes')
const app = next({ dev: process.env.NODE_ENV !== 'production', dir: './src' })
const handler = routes.getRequestHandler(app)

const port = process.env.PORT || 3000

// Server up
const { createServer } = require('http')
app.prepare().then(() => {
  createServer(handler).listen(port)
  console.log(`Server on port ${port}`)
})
