require('dotenv').config();

const express = require('express');
const app = express();

const config = require('./config');

require('./config/express')(app);
require('./config/mongoose');

app.listen(config.PORT, console.log(`REST Api is running on port ${config.PORT}...`));
