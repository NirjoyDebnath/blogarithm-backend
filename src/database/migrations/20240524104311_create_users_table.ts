import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('UserName').notNullable().unique();
    table.string('Email').notNullable().unique();
    table.string('Name').notNullable();
    table.dateTime('JoinDate').notNullable();
    table.integer('Role').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
