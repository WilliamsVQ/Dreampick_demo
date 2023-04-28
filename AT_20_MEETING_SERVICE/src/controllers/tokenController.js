/**
*@tokenController.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const generateToken = require('../models/generateToken');

class TokenController{
    /**
     * Gets a valit token for a jitsi meeting.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object to be sent back to the client.
     * @returns {json} The response of generateToken function.
     */
    getToken (req, res) {
        const data = req.body;
        const token = generateToken(data.id, data.name, data.email, data.image, data.role, data.roomName);
        res.json({Token: token});
    }
}
module.exports = TokenController;