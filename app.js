const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();
const playerRoutes = require('./api/routes/player');

//connect mongodb
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(_result => {
console.log("Database connected");
})

mongoose.set('useFindAndModify', false);


//bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//load css and images
app.use(express.static(__dirname + '/public'));


//handle cors errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


//get routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname + '/admin.html'));
});

app.use('/', playerRoutes);




//error handling middleware
app.use((req, res, next) => {
    const error = new Error("No Request");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log('server started')
})