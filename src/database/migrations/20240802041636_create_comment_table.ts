import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Comments', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('UserId').notNullable();
    table.uuid('StoryId').notNullable();
    table.string('UserName').notNullable();
    table.string('Comment').notNullable();
    table.dateTime('CreatedAt').notNullable();
    table
      .foreign('UserId')
      .references('Id')
      .inTable('Users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('StoryId')
      .references('Id')
      .inTable('Stories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Comments');
}
