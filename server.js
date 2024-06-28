require('dotenv').config()
const express = require('express')
const cors = require('cors')
const GlobalErrorHandler = require('./middlewares/GlobalErrorHandler')
const dbConnection = require('./config/dbConfig')

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4000

// check api health
app.use('/health',(req,res,next)=>{
    res.json({
        message:'server running succesfully'
    })
})


//error route  (route not found)
app.use('*',(req, res, next) => {
    res.status(404).send('404 Not Found');
});

dbConnection()

app.use(GlobalErrorHandler)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})