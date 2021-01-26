const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
//chama o model dos usuarios
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

//lib para encripitar a senha
const bcrypt = require('bcryptjs');

//passport
const passport = require('passport');

const {eCadastrado} = require("../helpers/eCadastrado")

//rota para registros

router.get('/',   (req,res) => {
      res.render('usuarios/painelusuario');
})



router.get('/registro',   (req,res) => {
    //view registo
    res.render('usuarios/registro');
})

//rota post para registros Validação e registro no banco
router.post('/registro', (req,res) => {

    var erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null)
    {
        erros.push({texto: 'Nome Inválido!'})
    }

    if (req.body.nome.length < 4)
    {
        erros.push({texto: 'Nome muito curto!'});
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null)
    {
        erros.push({texto: 'E-mail Inválido!'})
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null)
    {
        erros.push({texto: 'Senha Inválida!'})
    }

    if (req.body.senha.length < 4)
    {
        erros.push({texto: 'Senha muito curta!'});
    }


    if (req.body.senha != req.body.senha2)
    {
        erros.push({texto: 'Senhas são diferentes!'})
    }

    if (erros.length > 0)
    {
        res.render('usuarios/registro', {erros:erros});
    }else{

        Usuario.findOne({email: req.body.email}).then((usuarioEmail) => { //procuro 1 usuario com email igual no banco de dados
            if(usuarioEmail)//se for encontrado o usuario com email igual acontece
            {
                req.flash('error_msg', 'E-mail já existe no sistema');
                res.redirect('/usuarios/registro');
            }
            else{//se nao for ele salva no banco com a senha encriptada
                    Usuario.findOne({cpf: req.body.cpf}).then((usuarioCpf) => {
                        if(usuarioCpf)//se for encontrado o usuario com email igual acontece
                            {
                                req.flash('error_msg', 'Cpf já existe no sistema');
                                res.redirect('/usuarios/registro');
                            }
                        else {
                const novoUsuario = new Usuario ({
                    nome : req.body.nome,
                    email : req.body.email,
                    cpf : req.body.cpf,
                    senha : req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro)
                        {
                            req.flash('error_msg', 'Houve um erro durante o salvamento do usuário');
                            res.redirect('/');
                        }

                        novoUsuario.senha = hash; //hasheando a senha

                        novoUsuario.save().then(()=>{//Salvando usuario
                            req.flash('success_msg', 'Usuário cadastrado com sucesso');
                            res.redirect('/');//msg sendo mostrada na home
                        }).catch((err)=>{
                            req.flash('error_msg', 'Houve um erro ao cadastrar o usuário no banco de dados');
                            res.redirect('/usuarios/registro');

                        })

                    })
                })

            }
            })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/');
        })
    }
})




//ROTA PARA LOGIN
router.get('/login', (req,res)=>{
    res.render('usuarios/login');
})

router.post('/login', (req, res, next) => { //ROTA DE AUTENTIFICAÇÃO

    passport.authenticate('local', {

        successRedirect: '/',//deu certo
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req, res, next)
})



router.get("/logout",(req,res)=>{

    req.logout() //passport faz logout automatico
    res.redirect("/")
})



module.exports= router

