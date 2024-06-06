import { Knex } from 'knex';
import { CreateStoryDTO, IStory } from '../interfaces/story';
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

export const getAllStories = async (): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories').select('*');
  return stories;
};

export const getStoryById = async (id: number): Promise<IStory | undefined> => {
  const story: IStory | undefined = await db<IStory>('Stories')
    .select('*')
    .where('Id', id)
    .first();
  return story;
};
