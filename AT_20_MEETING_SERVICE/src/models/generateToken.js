/**
*@generateToken.js
*Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
*Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
*All rights reserved
*This software is the confidential and proprietary information of
*Jalasoft, Confidential Information You shall not
*disclose such Confidential Information and shall use it only in
*accordance with the terms of the license agreement you entered into
*with Jalasoft
**/
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const generateToken = (userId, userName, userEmail, userImage, userRole, roomName) => {
    let moderatorValue = 'false';
    if (userRole == 'host') {
        moderatorValue = 'true';
    }
    /**
     * The function generates a JSON Web Token (JWT) using a private key and user information.
     * @param privateKey - The private key used to sign the JWT (JSON Web Token).
     * @returns The function `generate` returns a JSON Web Token (JWT) signed with the provided private
     * key and containing the specified payload data, including the user's ID, name, email, avatar, and
     * moderator status, as well as features such as livestreaming, recording, transcription, and
     * outbound calling. The JWT also includes an expiration time and a not-before time, and is signed
     * using the RS256
     **/
    const generate = (privateKey, { id, name, eml, avatar, appId, kid }) => {
        const now = new Date();
        const jwt = jsonwebtoken.sign({
            aud: 'jitsi',
            context: {
                user: {
                    id,
                    name,
                    avatar,
                    email: eml,
                    moderator: moderatorValue
                },
                features: {
                    livestreaming: 'true',
                    recording: 'true',
                    transcription: 'true',
                    'outbound-call': 'true'
                }
            },
            iss: 'chat',
            room: roomName,
            sub: appId,
            exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
            nbf: (Math.round((new Date()).getTime() / 1000) - 10)
        }, privateKey, { algorithm: 'RS256', header: { kid } });
        return jwt;
    };
    /**
    * `const privateKey = fs.readFileSync('src/models/Key 4_18_2023, 12_48_12 PM.pk', 'utf8');` is
    * reading the contents of a private key file located at `'src/models/Key 4_18_2023, 12_48_12
    * PM.pk'` and storing it in the `privateKey` constant. The `readFileSync` method is used to
    * synchronously read the file and the `'utf8'` encoding is specified to ensure that the contents
    * of the file are returned as a string. The private key is later used to sign the JSON Web Token
    * (JWT) in the `generate` function.
    **/
     const privateKey = fs.readFileSync('src/models/Key 4_18_2023, 12_48_12 PM.pk', 'utf8');

    /**
    * This code is generating a JSON Web Token (JWT) using the `jsonwebtoken` library in Node.js. The
    * `generateToken` function takes in several parameters such as `userId`, `userName`, `userEmail`,
    * `userImage`, `userRole`, and `roomName`. It then uses a private key stored in a file to sign the
    * JWT with the provided payload data. The resulting token is returned by the function and can be
    * used for authentication and authorization purposes. The `token` variable is assigned the value
    * returned by the `generate` function, which takes in the `privateKey` and an object containing
    * the payload data.
    **/
    const token = generate(privateKey, { // Pass your generated private key
        id: userId, // You can generate your own id
        name: userName, // Set the user name
        email: userEmail, // Set the user email
        avatar: userImage, // Set the user avatar
        appId: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104', // Your AppID
        kid: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104/dc6dc8' // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
    });

    return token;
};
module.exports = generateToken;
