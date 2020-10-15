const express = require('express')

const app = express()
const port = process.env.PORT || 3000


app.post('/addItems', (req, res)=>{
    res.send({message: "testing"})
})
app.listen(port, ()=>{
    console.log("server is running on port : ", port)
})