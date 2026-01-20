const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = "localhost";
const mongoose = require('mongoose');
const router = require('./userManagement/router');
const router2 = require('./paymentManagement/router')
const router3 = require('./orderManagement/router')
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}));

app.use(cookieParser());

app.use(express.json());

const uri = "mongodb+srv://manoharathilinaka:manohara2001@project.xgtswi1.mongodb.net/starlight?appName=Project";

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connect to MongoDB');
    } catch (error) {
        console.log('MongoDB Error',error);
    }
}

connect();

const server = app.listen(port,host,()=>{
    console.log(`Node Server is listernung to ${server.address().port}`);
})

app.use('/api',router);
app.use('/api',router2);
app.use('/api',router3);