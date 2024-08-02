import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Stories', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('AuthorId').notNullable();
    table.string('Title').notNullable();
    table.text('Description').notNullable();
    table.string('AuthorUserName').notNullable();
    table.dateTime('CreatedAt').notNullable();
    table
      .foreign('AuthorId')
      .references('Id')
      .inTable('Users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Stories');
}
