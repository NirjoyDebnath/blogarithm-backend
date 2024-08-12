import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('comments', function (table) {
    table.uuid('Id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('UserId').notNullable();
    table.uuid('StoryId').notNullable();
    table.string('UserName').notNullable();
    table.string('Comment').notNullable();
    table.dateTime('CreatedAt').notNullable();
    table
      .foreign('UserId')
      .references('Id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('StoryId')
      .references('Id')
      .inTable('stories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('comments');
}
