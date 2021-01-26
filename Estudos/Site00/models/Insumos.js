const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Insumos = new Schema({

    usuario:{
        type: Schema.Types.ObjectId,
        ref:"usuarios", required:true},

    nome_adubo:{
        type:String,
    },

    tipo:{
        type : Number
    },

    classificacao1:{
        type:String,
    },
    classificacao2:{
        type:String,
        },

    nome_defensivo:{
        type:String,
    },

    classe_defensivo:{
        type:String,
    },

    grupoquimico_defensivo:{
        type:String,
    },

    formulacao_defensivo:{
        type:String,
    },

    limite_defensivo:{
        type:String,
    },

    principioativo_defensivo:{
        type:String,
    },

    indicacao_defensivo:{
        type:String,
    },

    qtd: {
        type: Number,
    },

    preco: {
        type: Number
    }

});


mongoose.model("insumos", Insumos);

