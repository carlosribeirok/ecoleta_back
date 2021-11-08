import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('points', table => {
        table.decimal('latitude');
        table.decimal('longitude');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('points', table => {
        table.dropColumn('latitude');
        table.dropColumn('longitude');
    })
}

