const express = require('express');
const Router = express.Router();
const path = require('path');

const authRouters = require('./modules/auth/routers/authRouters');
const userRouters = require('./modules/user/routers/userRouters'); 


Router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//MODULES ROUTERS
Router.use("/auth", authRouters);
Router.use("/users", userRouters);


module.exports = Router;