require("dotenv").config();

const express = require('express');
const app = express();
const routes = require('./routes');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const knex = require('./config/database');
const modules = require('./modules');

const path = require('path');
const signale = require('signale');


async function start() {
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
    app.use(helmet());
    app.use(express.json());


    //MODULES INIT
    await modules.initModules();


    //HOME PAGE
    app.use(express.static("public"));
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/../public/index.html'));
    });


    //ROUTERS
    const APP_VERSION = process.env.APP_VERSION;
    app.use(`/api/${APP_VERSION}`, routes);


    //SERVER LISTEN
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
        signale.success(`Server Running on Port ${PORT}`);
    });

}

start();
