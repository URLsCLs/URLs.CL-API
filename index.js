require('dotenv').config();
const db = require('./modules/db');
var bodyParser = require('body-parser');
const express = require('express');
const { createRouter } = require('express-file-routing');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());



createRouter(app);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});