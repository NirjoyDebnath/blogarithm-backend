import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function(table){
        table.increments('Id').primary().unique();
        table.string('UserName').notNullable().unique();
        table.string('Email').notNullable().unique();
        table.string('Name').notNullable();
        table.date('JoinDate').notNullable();
        table.integer('Role').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('Users');
}

