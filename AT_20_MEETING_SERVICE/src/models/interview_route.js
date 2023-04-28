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
const mongoose = require('mongoose');

/* Creating a schema for the interview collection. */
const interviewSchema = new mongoose.Schema (
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        host_global_id: [{
            id : String,
            name : String,
            phone: String,
        }],
        guest_global_id: [{
            id : String,
            name : String,
            phone: String,
        }],
        meeting_name: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
        },
        start_time: {
            type: Date,//hour:Number min:Number sec:Number//ps
        },
        end_time: {
            type: Date,
        },
        time_zone: [{
            value : String,
            label : String,
        }],
        active:{
            type: Boolean,
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model('interview', interviewSchema);