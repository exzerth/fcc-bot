const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connect mongodb
mongoose.connect("mongodb+srv://fcc-bot:fBot152@fcc-bot-cluster.bkagm.mongodb.net/managers2020?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(_result => {
console.log("Database connected");
let port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);
}).catch(err => console.log(err));

//load css and images
app.use(express.static(__dirname + '/public'));

//get routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

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