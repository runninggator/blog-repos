import express from 'express'
import https from 'https'
import fs from 'fs'

const staticApp = express()
const dynamicApp = express()

staticApp.use(express.static('public'))

dynamicApp.all('/{*splat}', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.jimmy-localhost.com:3001')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

dynamicApp.options('/{*splat}', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'foo')
  res.sendStatus(204)
})

dynamicApp.get('/exampleEndpoint', (req, res) => {
  console.log(req.headers)
  res.send('Hello from the example endpoint!')
})

const options = {
  key: fs.readFileSync('./www.jimmy-localhost.com-key.pem'),
  cert: fs.readFileSync('./www.jimmy-localhost.com.pem'),
};

https.createServer(options, dynamicApp).listen(3000, () => {
  console.log('Dynamic server is running on https://www.jimmy-localhost.com:3000')
})

https.createServer(options, staticApp).listen(3001, () => {
  console.log('Static server is running on https://www.jimmy-localhost.com:3001')
})
