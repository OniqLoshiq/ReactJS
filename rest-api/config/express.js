const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('../routes');
const authentication = require('../middlewares/authentication');

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
      }));

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.use(authentication());

    app.use(routes);
}