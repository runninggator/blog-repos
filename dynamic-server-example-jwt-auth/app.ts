import express from 'express'
import https from 'https'
import fs from 'fs'
import * as jose from 'jose'

const staticApp = express()
const dynamicApp = express()

staticApp.use(express.static('public'))

dynamicApp.all('/{*splat}', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.jimmy-localhost.com:3001')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

dynamicApp.options('/{*splat}', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'foo, Content-Type')
  res.sendStatus(204)
})

dynamicApp.get('/exampleEndpoint', (req, res) => {
  console.log(req.headers)
  res.header('Set-Cookie', [
    'basic_cookie=basic cookie value',
    'httpOnly_cookie=httpOnly cookie value; Domain=www.jimmy-localhost.com; Path=/exampleEndpoint; Secure; HttpOnly; Max-Age=3600',
  ])
  res.send('Hello from the example endpoint!')
})

const secret = Buffer.from('webserver_secret_key')

dynamicApp.use(express.json())

dynamicApp.post('/login', async (req, res) => {
  console.log('login request body: ', req.body)
  const jwt = await new jose.SignJWT({ username: req.body.username })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('15 seconds')
		.sign(secret)
  res.json({ jwt })
})

dynamicApp.post('/testJwt', async (req, res) => {
  const jwt = await jose.jwtVerify(req.body.jwt, secret, {})
  console.log('user jwt: ', jwt)
  res.json({ jwt })
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
