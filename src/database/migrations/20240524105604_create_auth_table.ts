import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('auth', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('UserName').notNullable().unique();
    table.string('Password').notNullable();
    table.dateTime('PasswordModifiedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('auth');
}
