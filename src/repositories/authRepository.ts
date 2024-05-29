import { ISignUpUserInfoType } from '../interfaces/user';
import { IAuthType, ILogInAuthInfoType, ISignUpAuthInfoType } from '../interfaces/auth';
import { IUserType } from '../interfaces/user';
import db from '../database/db';
import { Knex } from 'knex';

export const signUp = async(userInfo: ISignUpUserInfoType, signUpAuthInfo: ISignUpAuthInfoType):Promise<IUserType> =>{
    const trx:Knex.Transaction = await db.transaction();
    try{
        await trx('Auth').insert(signUpAuthInfo);
        const [Id]: number[] = await trx('Users').insert(userInfo);
            
        await trx.commit();

        const user: IUserType = {Id, ...userInfo};
        return user;
    } catch(err){
        await trx.rollback();
        throw err;
    }
}

export const logIn = async(logInAuthInfo: ILogInAuthInfoType):Promise<string | undefined> =>{
    const auth = await db<IAuthType>('auth').select('*').where('UserName', logInAuthInfo.UserName).first();
    if(auth){
        const {Password} = auth;
        return Password;
    }
    else{
        return undefined;
    }
}