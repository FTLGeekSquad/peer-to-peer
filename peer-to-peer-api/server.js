const express = require('express')
const app = express()

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my app!')
  })