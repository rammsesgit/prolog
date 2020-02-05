const express = require('express')
const next = require('next')
const n_routes = require('next-routes')
const app = express()
const nextApp = next({ dev: process.env.NODE_ENV !== 'production', dir: './src' })
const routes = n_routes()
const handler = routes.getRequestHandler(nextApp)

app.use(express.json())

// Server up
nextApp.prepare().then(() => {
  app.use(handler).listen(process.env.PORT || 3000)
  console.log(`Run server on port: ${process.env.PORT || 3000} ✅`)
})
