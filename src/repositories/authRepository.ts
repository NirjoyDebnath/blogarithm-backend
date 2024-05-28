import { signUpUserInfoType } from '../interfaces/user';
import { signUpAuthInfoType } from '../interfaces/auth';
import { userType } from '../interfaces/user';
import db from '../databaseConnection/db';

export const signUp = async(userInfo: signUpUserInfoType, authInfo: signUpAuthInfoType):Promise<userType> =>{
    const trx = await db.transaction();
    try{
        await trx('Auth').insert(authInfo);
        const [Id] = await trx('Users').insert(userInfo);
            
        await trx.commit();
        
        const user: userType = {Id, ...userInfo};
        return user;
    } catch(err){
        await trx.rollback();
        throw err;
    }
    
}