const express = require('express')

const routes  = express.Router();

routes.post('/users', (req, res)=>{


    const body = req.body;

    console.log(body)


    return res.json({

        tipo1:'Aqui é o tipo 1',
        tipo2: 'Aqui é o tipo 2'
    })



})


module.exports = routes