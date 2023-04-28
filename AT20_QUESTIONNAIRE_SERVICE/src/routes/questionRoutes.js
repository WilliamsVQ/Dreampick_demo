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

const express = require('express');
const QuestionsController = require('../controllers/questionController');
const router = express.Router();

const questionsController = new QuestionsController();

// defines routes for questionsController
router.get('/:id', questionsController.getQuestion);
router.post('/', questionsController.setQuestion);
router.delete('/:id', questionsController.removeQuestion);

module.exports = router;
