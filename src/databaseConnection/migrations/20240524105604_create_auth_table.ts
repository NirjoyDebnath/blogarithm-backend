import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('auth', function(table){
        table.increments('Id').primary();
        table.string('UserName').notNullable();
        table.string('Name').notNullable();
        table.string('Email').notNullable();
        table.date('JoinDate').notNullable();
        table.integer('Role').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('auth');
}

