import express from 'express'
import https from 'https'
import fs from 'fs'

const app = express()

app.use(express.static('public'))

app.get('/exampleEndpoint', (req, res) => {
  console.log(req.headers)
  res.send('Hello from the example endpoint!')
})

const options = {
  key: fs.readFileSync('./www.jimmy-localhost.com-key.pem'),
  cert: fs.readFileSync('./www.jimmy-localhost.com.pem'),
};

https.createServer(options, app).listen(3000, () => {
  console.log('Server is running on https://www.jimmy-localhost.com:3000')
})
