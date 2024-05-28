import { signUpUserInfoType } from '../interfaces/user';
import { logInAuthInfoType, signUpAuthInfoType } from '../interfaces/auth';
import { userType } from '../interfaces/user';
import db from '../databaseConnection/db';

export const signUp = async(userInfo: signUpUserInfoType, signUpAuthInfo: signUpAuthInfoType):Promise<userType> =>{
    const trx = await db.transaction();
    try{
        await trx('Auth').insert(signUpAuthInfo);
        const [Id] = await trx('Users').insert(userInfo);
            
        await trx.commit();

        const user: userType = {Id, ...userInfo};
        return user;
    } catch(err){
        await trx.rollback();
        throw err;
    }
}

export const logIn = async(logInAuthInfo: logInAuthInfoType):Promise<string> =>{
    const password = await db('auth').select('*').where('UserName', logInAuthInfo.UserName).first();
    return password.Password;
}