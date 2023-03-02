const mongoose = require('mongoose')
const password = require('./password')

const connectionString = process.env.MONGO_DB_URI

//? Connexion a mongoDB
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }) .catch(err => {
        console.error(err)
    })
