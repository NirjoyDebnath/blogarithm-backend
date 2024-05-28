import { userType } from '../interfaces/user';
import db from './../databaseConnection/db';

export const getAllUsers = async():Promise<userType[]> => {
    const users:userType[] = await db<userType>('Users').select('*');
    return users;
}

export const deleteUser = async(id:number):Promise<number> =>{
    const trx = await db.transaction();

    try{
        const user = await trx<userType>('Users').select('*').where('Id', id).first();
        if(!user){
            throw new Error('No such user');
        }
        await trx('Users').where('UserName', user.UserName).del();
        await trx('auth').where('UserName', user.UserName).del();
        await trx.commit();
        return 1;

    } catch(err){
        await trx.rollback();
        throw err;
    }
}