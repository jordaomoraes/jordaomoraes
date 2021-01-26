import Knex from 'knex';

// alterações que queria fazer no banco
export async function up (knex : Knex) {


    return knex.schema.createTable('fazendas', table =>{

        table.increments('id').primary();
        table.string('razao').notNullable;
        table.string('cnpj').notNullable;
        table.string('endereco').notNullable;
        table.string('regiao').notNullable;
        
    })
}

//aqui desfas as alterações
export async function down (knex : Knex) {

    return knex.schema.dropTable('fazendas')

}



