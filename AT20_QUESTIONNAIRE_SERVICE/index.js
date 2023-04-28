/*
* Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

const QuestionnaireRoutes = require('./src/routes/questionnaireRoutes');
const QuestionRoutes = require('./src/routes/questionRoutes');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Used to load environment variables from a .env file into process.env.
const dotenv = require('dotenv');
const loggerService = require('./loggerService');
dotenv.config();
app.use(cors());
// routes
app.use('/api/v1.0/questionnaire', QuestionnaireRoutes);
app.use('/api/v1.0/question', QuestionRoutes);

// Uses to start the server.
const PORT = process.env.PORT || 9090;

// opens a port
app.listen(PORT, () => {
    loggerService.info(`Server running on port ${PORT}`);
});
