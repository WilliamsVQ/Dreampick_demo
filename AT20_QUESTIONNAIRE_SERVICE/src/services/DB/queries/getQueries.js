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
class GetQueries {
    // Hard code data for name of test
    test = {
        aptitude: 1,
        concentration: 2,
        logical: 3,
        reasoning: 4,
        spatial: 5
    };

    // Hard code data for type of test
    type = {
        checkbox: 1,
        radiobutton: 2
    };

    getQuestion (idQuestion) {
        throw new Error('It should be implemented');
    }

    getOptions (idQuestion) {
        throw new Error('It should be implemented');
    }

    getQuestionnaire (test) {
        throw new Error('It should be implemented');
    }
}

module.exports = GetQueries;
