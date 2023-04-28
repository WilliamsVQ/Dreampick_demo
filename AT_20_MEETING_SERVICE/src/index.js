/**
*@index.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors")
const interviewRoute = require('./routes/interview_route');
const bodyParser = require('body-parser');
// Importing the MongoDb class from the dbMongo file.
const MongoDb = require('./configs/dbMongo');

const app = express();
dotenv.config();
app.use(cors())
app.get('/api/v1/', (req, res) => {
    res.send('hello from the home');
});

//Middlewares for the inputs from body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Routes
app.use('/api/v1/interview', interviewRoute);

//Db connection
const mongoDb = new MongoDb();
mongoDb.dbConnectMongo();

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('The app is online');
});