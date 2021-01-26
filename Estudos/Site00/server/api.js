const axios = require ('axios')


const api = axios.create({

    baseURL: 'http://localhost:666',
    // transformRequest: [
    //     (data, headers) => {
    //         const encryptedString = (JSON.stringify(data));

    //         data = {
    //             SecretStuff: encryptedString,
    //         };

    //         return JSON.stringify(data);
    //     },
    // ],



});

module.exports = api