/**
*@interview_route.js
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
const router = express.Router();
const InterviewController = require('../controllers/interview_route');
const interviewController = new InterviewController();
const TokenController = require('../controllers/tokenController');
const tokenController = new TokenController();

//Endpoint to create an interview
router.post(
    '/save',
    interviewController.insertInterview
);

// Endpoint to read all interviews
router.get(
    '/interviews',
    interviewController.getAllInterviews
);

//Endpoint to read a single interview by ID
router.get(
    '/interview/:id',
    interviewController.getInterviewById
);
 //Endpoint to update an interview by ID
router.put(
    '/interview/:id',
    interviewController.updateInterview
);

// Endpoint to delete a interview by ID
router.delete(
    '/interview/:id',
    interviewController.deleteInterviewById
);

// Endpoint to obtain a meeting token
router.get(
    '/token',
    tokenController.getToken
);

module.exports = router;