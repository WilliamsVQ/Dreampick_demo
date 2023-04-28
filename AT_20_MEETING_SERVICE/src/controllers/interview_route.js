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
const model = require('../models/interview_route');

class InterviewController{
    //Create an interview and insert in mongo db
    insertInterview (req, res) {
        const interview = req.body;
        try {
            model.create(interview);
            res.send(interview);
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: 'Server error: ' + error,
                error: error
            });
        };
    }

    //Get all Interviews from mongo db
    getAllInterviews = async(req, res) => {
        const interviews = await model.find();
        res.json(interviews);
    };

    //Get an Interview by Id from mongo db
    getInterviewById = async (req, res) => {
        const data = req.params.id;
        const interview = await model.findOne({"id": data});
        if (!interview) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            res.json(interview);
        }
    }

    //Update an Interview by Id
    updateInterview = async (req, res) => {
        const id  = req.params;
        const interview = await model.findOneAndUpdate(id, req.body)
        if (!interview) {
            res.status(404).json({ message: 'interview not found' });
        } else {
            res.send(`Interview was updated successfully`);
        }
    }

    //Delete an Interview by Id from mongo db
    deleteInterviewById = async (req, res) => {
        const id  = req.params;
        const interview = await model.findOneAndDelete(id)
        if (!interview) {
            res.status(404).json({ message: 'Interview not found' });
        } else {
            res.send(`Interview was delete successfully`);
        }
    }
}
module.exports = InterviewController;