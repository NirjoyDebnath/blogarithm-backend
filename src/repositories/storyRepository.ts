import { ICreateStoryDTO, IStory, IUpdateStoryDTO } from '../interfaces/story';
import db from '../database/db';

export const createStory = async (
  createStoryDTO: ICreateStoryDTO
): Promise<void> => {
  await db('stories').insert(createStoryDTO);
};

export const getAllStories = async (
  storyPerPage: number,
  offset: number,
  search: string
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('stories')
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
        '%" or AuthorUserName like ' +
        '"%' +
        search +
        '%"'
    )
    .orderBy('CreatedAt', 'desc');
  return stories;
};

export const getStoryCount = async (): Promise<number> => {
  const [count] = await db<IStory>('stories').count('Id', { as: 'count' });
  return Number(count.count);
};

export const getStoryCountByUserId = async (id: string): Promise<number> => {
  const [count] = await db<IStory>('stories')
    .count('Id', { as: 'count' })
    .where('AuthorId', id);
  return Number(count.count);
};

export const getSearchCount = async (search: string): Promise<number> => {
  const [count] = await db<IStory>('stories')
    .count('Id', { as: 'count' })
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%" or AuthorUserName like ' +
        '"%' +
        search +
        '%"'
    );
  return Number(count.count);
};

export const getSearchCountByUserId = async (
  id: string,
  search: string
): Promise<number> => {
  const [count] = await db<IStory>('stories')
    .count('Id', { as: 'count' })
    .whereRaw('AuthorId = ?', [id])
    .whereRaw(
      'Title like ' +
        '"%' +
        search +
        '%" or Description like ' +
        '"%' +
        search +
        '%" or AuthorUserName like ' +
        '"%' +
        search +
        '%"'
    );
  return Number(count.count);
};

export const getStoryById = async (id: string): Promise<IStory | undefined> => {
  const story: IStory | undefined = await db<IStory>('stories')
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
  const stories: IStory[] = await db<IStory>('stories')
    .select('*')
    .whereRaw('AuthorId = ?', [AuthorId])
    .andWhereRaw('Title like ' + '"%' + search + '%"')
    .andWhereRaw('Description like ' + '"%' + search + '%"')
    .limit(storyPerPage)
    .offset(offset)

    .orderBy('CreatedAt', 'desc');
  return stories;
};

export const updateStoryById = async (
  id: string,
  updateStoryDTO: IUpdateStoryDTO
): Promise<boolean> => {
  const isUpdated: boolean = await db('stories')
    .where('Id', id)
    .update(updateStoryDTO);
  return isUpdated;
};

export const deleteStoryById = async (id: string): Promise<boolean> => {
  const isDeleted: boolean = await db('stories').where('Id', id).del();
  return isDeleted;
};
