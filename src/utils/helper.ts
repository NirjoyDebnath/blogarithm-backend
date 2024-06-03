import { IUser } from '../interfaces/user';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';
import { IPayload, ITokenInfo } from '../interfaces/token';

export const getTokenInfoFromToken = async (decodedToken: string | jwt.JwtPayload): Promise<ITokenInfo> => {
  const tokenInfo = decodedToken as ITokenInfo;
  return tokenInfo;
};

export const getToken = async (user: IUser): Promise<string> => {
  const payload:IPayload = {
    userName: user.UserName,
    name: user.Name,
    role: user.Role
  };
  const token = jwt.sign(payload, ENV.SecretKey || 'hello', {
    expiresIn: '1d'
  });
  return token;
};

export const verifyToken = async (token: string | undefined): Promise<ITokenInfo> => {
  if(!token){
    throw new Error('No token provided')
  }
  const decodedToken = jwt.verify(token, ENV.SecretKey || 'hello');
  const tokenInfo = getTokenInfoFromToken(decodedToken)
  return tokenInfo;
};
