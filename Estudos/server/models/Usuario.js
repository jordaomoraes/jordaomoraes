const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    eadmin: {
        type: Number,
        default: 0
    },
    epagante: {
        type: Number,
        default: 0
    },
    erepresentante: {
        type: Number,
        default: 0
    },
    dependentes: [{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }],
    fornecedor: [{
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }],
    plano: {
        type: Schema.Types.ObjectId,
        ref: 'planos'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    credito_atual: {
        type: Number,
        default: 0
    },

    creditos_usados: {
        type: Number,
        default: 0
    },
    lotes_criados: {
        type: Number,
        default: 0
    },
    vencimento_parcela: {
        type: Date,
    },
    data_1_pagamento: {
        type: Date,
    },
    tipo_pagamento: {
        type: String,

    },
    prox_pagamento: {
        type: Date,
    },
    status_pago: {
        type: Number,
        default: 0
    },

});
//criando efetivamente, e passando o nome categorias
mongoose.model("usuarios", Usuario);
