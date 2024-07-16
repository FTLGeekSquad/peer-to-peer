const express = require('express')
const app = express()

const PORT = 3000
const listingRoutes = require('./routes/listingRoutes')
const userRoutes = require('./routes/userRoutes')
const reviewRoutes = require('./routes/reviewRoutes')


app.get('/', (req, res) => {
    res.send('Welcome to my app!')
  })

app.use('/listings', listingRoutes)
app.use('/users', userRoutes)
app.use('/reviews', reviewRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})