import express from 'express'

const app = express()

app.use(express.static('public'))

app.get('/exampleEndpoint', (req, res) => {
  console.log(req.headers)
  res.send('Hello from the example endpoint!')
})

app.listen(3000, () => {
  console.log('Server is running on localhost:3000')
})
