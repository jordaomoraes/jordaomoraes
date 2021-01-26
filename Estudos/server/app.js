//carregando os modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash');
const moment = require('moment')
const cors = require('cors');


const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//importando rotas criadas
const raiz = require("./routes/raiz")
const usuarios = require('./routes/usuario');

const adubos = require("./routes/rotaadubo");



const mongoose = require("mongoose");
const db = require("./config/db");

const passport = require('passport');//chamando o passport
require('./config/auth')(passport)//chamando a autentificação do passport


//configurações
//Sessão
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Sessão do passport
app.use(passport.initialize())
app.use(passport.session())
//flash
app.use(flash())
//MiddleWare
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.user = req.user || null;
    next();
})
//configurando o body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname,'uploads')))

app.use(express.static('public/img'));
//handlebars
app.engine("handlebars", handlebars({
    defaultLayout: "main",
     helpers: {
         formatDate: (date) => {
             return moment(date).add(1, 'days').format('DD/MM/YYYY')
         },
     }
}));

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set("view engine", "handlebars");
//mongoose
mongoose.Promisse = global.Promise;
mongoose
    .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado ao mongo!");
    })
    .catch(erro => {
        console.log("Erro ao Conectar com o Banco de Dados : " + erro);
    });

//public
//aqui vai ser os arquivos estaticos , Css
//indicando qual pasta vai estar os arquivos de css e javascript
//dirname pega o caminho absoluto
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    next();
})

//rotasss
//-------------------------------
app.use('/', raiz)
app.use('/usuarios', usuarios)
app.use('/adubos', adubos)



//Start Servidor
const PORT = process.env.PORT_WWW_APP || 666;
app.listen(PORT, () => {
    console.log("Servidor Rodando!!!  http://localhost:666/ ");
});


