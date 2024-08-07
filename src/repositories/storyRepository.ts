import { ICreateStoryDTO, IStory, IUpdateStoryDTO } from '../interfaces/story';
import db from '../database/db';

export const createStory = async (
  createStoryDTO: ICreateStoryDTO
): Promise<void> => {
  await db('Stories').insert(createStoryDTO);
};

export const getAllStories = async (
  storyPerPage: number,
  offset: number
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories')
    .select('*')
    .limit(storyPerPage)
    .offset(offset);
  return stories;
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
  offset: number
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories')
    .select('*')
    .where('AuthorId', AuthorId)
    .limit(storyPerPage)
    .offset(offset);
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
