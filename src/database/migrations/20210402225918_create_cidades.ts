import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cities', table => {
        table.increments('id').primary();
        table.string('name').notNullable(); 
        table.integer('state_id', 10)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cities');
}

