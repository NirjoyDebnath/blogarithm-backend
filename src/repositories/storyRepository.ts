import { ICreateStoryDTO, IStory, IUpdateStoryDTO } from '../interfaces/story';
import db from '../database/db';

export const createStory = async (
  createStoryDTO: ICreateStoryDTO
): Promise<void> => {
  await db('Stories').insert(createStoryDTO);
};

export const getAllStories = async (
  storyPerPage: number,
  offset: number,
  search: string
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories')
    .select('*')
    .limit(storyPerPage)
    .offset(offset)
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%"'
    )
    .orderBy('CreatedAt', 'desc');
  return stories;
};

export const getStoryCount = async (): Promise<number> => {
  const [count] = await db<IStory>('Stories').count('Id', { as: 'count' });
  return Number(count.count);
};

export const getStoryCountByUserId = async (id: string): Promise<number> => {
  const [count] = await db<IStory>('Stories')
    .count('Id', { as: 'count' })
    .where('AuthorId', id);
  return Number(count.count);
};

export const getSearchCount = async (search: string): Promise<number> => {
  const [count] = await db<IStory>('Stories')
    .count('Id', { as: 'count' })
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%"'
    )
  return Number(count.count);
};

export const getSearchCountByUserId = async (id: string, search: string): Promise<number> => {
  const [count] = await db<IStory>('Stories')
    .count('Id', { as: 'count' })
    .where('AuthorId', id)
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%"'
    )
  return Number(count.count);
};

export const getStoryById = async (id: string): Promise<IStory | undefined> => {
  const story: IStory | undefined = await db<IStory>('Stories')
    .select('*')
    .where('Id', id)
    .first();
  return story;
};

export const getStoriesByUserId = async (
  AuthorId: string,
  storyPerPage: number,
  offset: number,
  search: string
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories')
    .select('*')
    .where('AuthorId', AuthorId)
    .limit(storyPerPage)
    .offset(offset)
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%"'
    )
    .orderBy('CreatedAt', 'desc');
  return stories;
};

export const updateStoryById = async (
  id: string,
  updateStoryDTO: IUpdateStoryDTO
): Promise<boolean> => {
  const isUpdated: boolean = await db('Stories')
    .where('Id', id)
    .update(updateStoryDTO);
  return isUpdated;
};

export const deleteStoryById = async (id: string): Promise<boolean> => {
  const isDeleted: boolean = await db('Stories').where('Id', id).del();
  return isDeleted;
};
