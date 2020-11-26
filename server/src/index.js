const express = require('express')
const multer = require('multer')
const axios = require('axios')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
//Instantiate the express
const app = express()

//use environment port, otherwise, use 3000 port 
const port = process.env.PORT || 3000

//middleware for multer. multer support form-data. dest specify the folder where the image from request will be saved
const upload = multer({
    // dest: 'images', 
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

    var config = {
        method: 'post',
        url: 'https://foodsaver.cognitiveservices.azure.com/vision/v2.0/analyze?language=en&visualFeatures=Objects',
        headers: { 
            'Content-Type': 'application/octet-stream', 
            'Ocp-Apim-Subscription-Key': '8962510d94cc4c40aeec29ad416fce1a'
        },
        data : req.file.buffer
    };
    const {data:{objects:response}} = await axios(config)

    const converted = await Promise.all(response.map(async (object)=>{
        const imageBuffer = await sharp(req.file.buffer)
            .extract(
                {
                    left: object.rectangle.x,
                    top: object.rectangle.y,
                    width: object.rectangle.w,
                    height: object.rectangle.h
                }
            )
            .jpeg()
            .toBuffer()
        return {
            key: uuidv4(),
            productname : object.object,
            expiryDate: Math.floor(Math.random() * 10),
            image : imageBuffer
        }
    }))
    // console.log(converted)
    res.send(response)
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