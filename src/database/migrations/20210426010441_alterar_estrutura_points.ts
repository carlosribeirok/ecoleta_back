import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('points', table => {
        table.dropColumn('uf');
        table.dropColumn('city');
        table.integer('state_id', 10)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states');
        table.integer('city_id', 10)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('points', table => {
        table.dropColumn('state_id');
        table.dropColumn('city_id');
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
}

