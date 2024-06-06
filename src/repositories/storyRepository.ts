import { CreateStoryDTO, IStory, UpdateStoryDTO } from '../interfaces/story';
import db from '../database/db';

export const createStory = async (
  createStoryDTO: CreateStoryDTO
): Promise<void> => {
  await db('Stories').insert(createStoryDTO);
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

export const getStoriesByUserName = async (
  AuthorUserName: string
): Promise<IStory[]> => {
  const stories: IStory[] = await db<IStory>('Stories')
    .select('*')
    .where('AuthorUserName', AuthorUserName);
  return stories;
};

export const updateStoryById = async (
  id: number,
  updateStoryDTO: UpdateStoryDTO
): Promise<void> => {
  await db('Stories').update(updateStoryDTO).where('Id', id);
};

export const deleteStoryById = async (id: number): Promise<void> => {
  await db('Stories').del().where('Id', id);
};
