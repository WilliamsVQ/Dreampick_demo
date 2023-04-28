/* eslint-disable no-tabs */
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

const MySQLDataBase = require('./DB/mySQLDataBase');
const dotenv = require('dotenv');
const GetQueriesMysql = require('./DB/queries/getQueriesMysql');
const SetQueriesMysql = require('./DB/queries/setQueriesMysql');
const DeleteQueriesMysql = require('./DB/queries/deleteQueriesMysql');
dotenv.config();

class Questions {
    #configbd = {
        host: process.env.HOST_DATA_BASE,
        user: process.env.USER_DATA_BASE,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.DATABASE_NAME
    };

    /**
* sets a question to DB
* @param {object} question - it should have the following properties:
*			{
*			"question": "what is .....",
*			"test" : "logical",
*			"imgSrc": "",
*			"type" : "radiobutton",
*			"answer": "op2",
*			"options": [
*				{ "value": "op1", "label": "Option 12" },
*				{ "value": "op2", "label": "Option 22" },
*				{ "value": "op3", "label": "Option 32" },
*				{ "value": "op4", "label": "Option 42" }
*				]
*		    }
* @returns {object} - similar to question
*/

    async setQuestion (question) {
        const db = new MySQLDataBase(this.#configbd);
        const setCommand = new SetQueriesMysql();
        db.connect();
        await db.execute(setCommand.setQuestion(question));
        await db.execute(setCommand.setOptions(question));
        db.disconnect();
        return question;
    }

    /**
	* gets a question with its options to DB
	* @param {string} idQuestion - it should be the ID of the question which you want to get
	* @returns {Object} - similar to question
	*/
    async getQuestion (idQuestion) {
        const db = new MySQLDataBase(this.#configbd);
        const getCommand = new GetQueriesMysql();
        let res;
        db.connect();
        const question = await db.execute(getCommand.getQuestion(idQuestion));
        const options = await db.execute(getCommand.getOptions(idQuestion));
        if (Object.keys(question).length > 0) {
            res = {
                ...question[0],
                options
            };
        } else {
            res = { message: 'Question was not found' };
        }
        db.disconnect();
        return res;
    }

    /**
	* deletes a question with its options to DB
	* @param {string} idQuestion - it should be the ID of the question which you want to delete
	* @returns {Object} - just a message
	*/
    async removeQuestion (idQuestion) {
        const db = new MySQLDataBase(this.#configbd);
        const deleteCommand = new DeleteQueriesMysql();
        db.connect();
        await db.execute(deleteCommand.deleteOptions(idQuestion));
        await db.execute(deleteCommand.deleteQuestion(idQuestion));
        db.disconnect();
        return { Message: 'Question was deleted' };
    }
}

module.exports = Questions;
