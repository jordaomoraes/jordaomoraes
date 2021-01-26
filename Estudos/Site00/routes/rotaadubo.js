//arquivo que vai armazenar as rotas admin
const express = require("express");
//a linha abaixo é necessaria para instanciar o objeto Router() na variavel router
const router = express.Router();
const api = require("../server/api");
const mongoose = require("mongoose");

require("../models/Insumos");
const { eCadastrado } = require("../helpers/eCadastrado");
const Adubo = mongoose.model("insumos");
//rota que vai exibir os produtores e um link para o cadastro

router.get("/", (req, res) => {
    api.get("/fazendas")
        .then((response) => {
            const busca = response.data;
            res.render("cadastros/adubo", { busca: busca });
          })
        .catch((error) => console.log(error)); //caso ocorra algum erro
});

//CHAMA A PAGINA DE CADASTRO
router.get("/add", eCadastrado, (req, res) => {
    res.render("cadastros/addadubo");
});
// //ROTA PARA CADASTRO DE ADUBOS
router.post("/novo", (req, res) => {
    const dados = {
        razao: req.body.nome_adubo,
        cnpj: req.body.classificacao1,
        endereco: req.body.classificacao2,
        regiao: "1546465",
    };
    api.post("/fazendas", dados)
        .then(() => {
            res.redirect("/adubos");
        })
        .catch((erro) => {
            res.send({ erro: erro });
        });
});

router.get("/edit/:id", eCadastrado, (req, res) => {
    //aqui vai preencher os campos quando abrir o formulario para edicao
    // e pega compara o id pelo que vem do form, id:req.params.id
    async function getSingleFazenda() {
        var response = await api.get('fazendas2/' + req.params.id)
        const dados = {
            razao: response.data[0].razao,
            cnpj: response.data[0].cnpj,
            endereco:  response.data[0].endereco,
            regiao: response.data[0].regiao,
            id:response.data[0].id
        };
        res.render('cadastros/editadubo', {dados:dados})
        }
    getSingleFazenda()
});

//ROATA PARA EDIÇÃO
router.post("/edit", eCadastrado, (req, res) => {
    const dados = {
        razao: req.body.nome_adubo,
        cnpj: req.body.classificacao1,
        endereco: req.body.classificacao2,
        regiao: "1546465",
        id:req.body.id
    };
    api.put("/fazendas", dados)
    .then(() => {
        res.redirect("/adubos");
    })
    .catch((erro) => {
        res.send({ erro: erro });
    });

});

//ROTA PARA DELETAR
router.get("/delete/:id", eCadastrado, (req, res) => {
    async function deletar (){
        const response = await api.delete('fazendas/' + req.params.id) .then(() => {
            res.redirect("/adubos");
          //  res.flash('sucess_msg', 'Deletado com Sucesso');
         })
         .catch((erro) => {
            res.send({ erro: erro });
         });
    }
        deletar()
});

module.exports = router;
