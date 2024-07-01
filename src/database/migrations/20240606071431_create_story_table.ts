import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Stories', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('Title').notNullable();
    table.text('Description').notNullable();
    table.string('AuthorUserName').notNullable();
    table.foreign('AuthorUserName').references('UserName').inTable('Users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Stories');
}
