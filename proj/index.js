const express = require('express')
const mydb = require('./config/db')
const cors = require('cors');
const app = express()
const rout=require("./routes/router")
const bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use(cors());
app.use(rout)

app.listen(3000,()=>{
    console.log("server is running")
})