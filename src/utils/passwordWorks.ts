import bcrypt from 'bcrypt';

export const hash = async (data: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(data, salt);
  return hashedPassword;
};

export const isHashMatched = async (
  originalData: string,
  hashedData: string
): Promise<boolean> => {
  const isMached: boolean = await bcrypt.compare(originalData, hashedData);
  return isMached;
};
