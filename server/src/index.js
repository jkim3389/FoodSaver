const express = require('express')
const multer = require('multer')

//Instantiate the express
const app = express()

//use environment port, otherwise, use 3000 port 
const port = process.env.PORT || 3000

//middleware for multer. multer support form-data. dest specify the folder where the image from request will be saved
const upload = multer({
    dest: 'images', 
    limits: {
        //restrict imagesize to 4MB
        fileSize:4000000

        //Testimg imagesize with 1KB
        // fileSize: 100000
    },
    // only accept image format
    fileFilter(req, file, cb){
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(undefined, true)
        } else {
            cb(undefined, false)
            return cb(new Error("uploaded file must be image format"))
        }
        /*
            Handle Error 

            //return the error
            cb(new Error("uploaded file must be image"))
            //accept file
            cb(undefined, true)
            //reject file
            cb(undefined, false)
        */
    }
})


// POST method API. 
app.post('/addItems', upload.single('upload'), async (req, res)=>{
    

    res.send(req.file)
}, (error, req, res, next)=>{
    res.status(400).send({Error:error.message})
})


//server is waiting on port 3000
app.listen(port, ()=>{
    console.log("server is running on port : ", port)
})




/*
 Use case #1
    send http call from react-native 
    in nodeJS, get image and send it to azure api-> return response. and send back only necessary data to react
 */