import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('states', table => {
        table.increments('id').primary();
        table.string('name').notNullable(); 
        table.string('uf', 2).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('states');
}

