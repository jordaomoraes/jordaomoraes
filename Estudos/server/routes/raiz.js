const express = require('express');
const router = express.Router();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

//rota principal

router.get('/',(req,res)=>{
    res.render("index");
})

router.get('/mpago',(req,res)=>{
    endereco = ""
    // Configura credenciais
    mercadopago.configure({
        //access_token: 'PROD_ACCESS_TOKEN' //
        //access_token: 'TEST-7050419740889151-102207-d5762b333f3f65362e8fe77c756b5f10-32047785'
        access_token: 'APP_USR-7050419740889151-102207-21c7bd61fdb14095a42688d0b92e661b-32047785'
        });

    // Cria um objeto de preferência
    let preference = {
        items: [
            {
            title: 'Jera rastreabilidade',
            unit_price: 10.00,
            quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function(response){
    // Este valor substituirá a string "$$init_point$$" no seu HTML
        global.init_point = response.body.init_point;

        endereco = init_point

        console.log(init_point)
        }).catch(function(error){
        console.log(error);
        });
    //endereco ='http://actualsolucoes.com.br/'


    res.redirect(endereco)

    //res.redirect("'" + init_point  +"'")
    //res.render("mpago");
})


module.exports= router