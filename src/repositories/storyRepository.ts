import { Knex } from 'knex';
import { CreateStoryDTO } from '../interfaces/story';
import db from '../database/db';

export const createStory = async (
  createStoryDTO: CreateStoryDTO
): Promise<void> => {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await trx('Stories').insert(createStoryDTO);
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
