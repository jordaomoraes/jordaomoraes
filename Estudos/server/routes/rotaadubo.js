//arquivo que vai armazenar as rotas admin
const express = require("express");
//a linha abaixo é necessaria para instanciar o objeto Router() na variavel router
const router = express.Router();
const mongoose = require("mongoose");

require("../models/Insumos");
const {eCadastrado} = require("../helpers/eCadastrado")
const Adubo = mongoose.model("insumos");
//rota que vai exibir os produtores e um link para o cadastro
router.get("/",  (req, res) => {
        Adubo.find({tipo:0 },)
            .then((adubos) => {
                // res.render("cadastros/adubo", { adubos: adubos });
                res.send({adubos});
            })
            .catch((erro)=> {
                req.flash(
                    "error_msg",
                    "Erro ao listar os adubos! " + erro
                );
                res.redirect("/");
            });

});
//CHAMA A PAGINA DE CADASTRO
router.get("/add", eCadastrado,  (req, res) => {
    res.render("cadastros/addadubo");
});
// //ROTA PARA CADASTRO DE ADUBOS
router.post("/novo", eCadastrado,  (req, res) => {


        const novoAdubo = {
            //aqui os campos que seram inseridos no BD
            nome_adubo: (req.body.nome_adubo),
            classificacao1: req.body.classificacao1,
            classificacao2: req.body.classificacao2,
            usuario: req.user._id,
            qtd: 0,
            tipo : 0,
            tipo_exibicao : false,
        };
        new Adubo(novoAdubo)
            .save()
            .then(() => {
                req.flash(
                    "success_msg",
                    "Adubo: " + req.body.nome_adubo + " Cadastrado com sucesso!"
                );
                res.redirect("/adubos");
            })
            .catch((erro) => {
                req.flash("error_msg", "erro ao cadastrar o adubo");

                res.redirect("/");
            });

});

//rota para abrir um novo pagina com ADUBO, exibir e salvar o id
router.get("/edit/:id", eCadastrado,  (req, res) => {
    //aqui vai preencher os campos quando abrir o formulario para edicao
    // e pega compara o id pelo que vem do form, id:req.params.id

    Adubo.findOne({ _id: req.params.id })
        .then((adubo) => {
            res.render("cadastros/editadubo", { adubo: adubo });
        })
        .catch((erro) => {
            req.flash("error_msg", "Esse adubo não existe! ");
            res.redirect("/");
        });
});



//ROATA PARA EDIÇÃO DA GLEBA
router.post('/edit', eCadastrado,  (req, res)=>{


    Adubo.findOne({_id: req.body.id}).then((adubo)=>{//pesquisa uma categoria q tem um id
            adubo.nome_adubo= req.body.nome_adubo,
            adubo.classificacao1= req.body.classificacao1,
            adubo.classificacao2= req.body.classificacao2,
            adubo.qtd= 0,
            usuario= req.user._id
        adubo.save().then(()=>{
            req.flash('success_msg', 'Adubo: '+req.body.nome_adubo+' Editado com sucesso!');
            res.redirect('/adubos');
        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao editar o Adubo '+req.body.nome_adubo+'! ');
            res.redirect('/adubos');
        })
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao editar o Adubo '+req.body.nome_adubo+'!');
        res.redirect('/adubos');
    });

})

//ROTA PARA DELETAR
router.get("/delete/:id",  eCadastrado,  (req, res) => {
    Adubo.remove({_id:req.params.id})
.then(()=>{
    req.flash("success_msg", "Adubo Deletado com sucesso")
        res.redirect("/adubos")
}).catch((erro)=>{
    req.flash("error_msg", "Erro ao Deletar Adubo")
        res.redirect("/adubos")
})

});


module.exports = router;