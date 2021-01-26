import Knex from 'knex';

// alterações que queria fazer no banco
export async function up (knex : Knex) {


    return knex.schema.createTable('cafes_cru', table =>{

        table.increments('id').primary();
        table.string('tipo').notNullable;
        table.integer('qtd_atual').notNullable;
        table.integer('qtd_minima').notNullable;        
        table.integer('fazenda_id')
        .notNullable()
        .references('id')
        .inTable('fazendas')
        .onDelete('CASCADE')
        .onDelete('CASCADE')
        
    })
}

//aqui desfas as alterações
export async function down (knex : Knex) {

    return knex.schema.dropTable('cafes_cru')

}



