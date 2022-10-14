const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cryptoRoutes = require('./routes/cryptos')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors())

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use(express.json())

//routes
app.use('/api/cryptos', cryptoRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server running on PORT 10000.")
        })
    }) .catch((error) => {
        console.log(error);
    })

