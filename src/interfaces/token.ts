interface IToken {
  userName: string;
  name: string;
  role: number;
  iat: number;
  exp: number;
}

export interface ITokenInfo extends IToken {}
export interface IPayload extends Pick<IToken, 'userName' | 'name' | 'role'> {}
