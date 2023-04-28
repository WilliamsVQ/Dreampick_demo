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
class DataBase {
    constructor (config) {
        this.config = config;
        this.connection = null;
    }

    connect () {
        throw new Error('It should be implemented');
    }

    execute (command) {
        throw new Error('It should be implemented');
    }

    #disconnect () {
        throw new Error('It should be implemented');
    }
}

module.exports = DataBase;
