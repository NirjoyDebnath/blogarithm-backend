import { IUserType } from '../interfaces/user';
import db from '../database/db';

export const getAllUsers = async():Promise<IUserType[]> => {
    const users:IUserType[] = await db<IUserType>('Users').select('*');
    return users;
}

export const deleteUser = async(id:number):Promise<boolean> =>{
    const trx = await db.transaction();

    try{
        const user:IUserType | undefined = await trx<IUserType>('Users').select('*').where('Id', id).first();
        if(!user){
            throw new Error('No such user');
        }
        const {UserName} = user;
        await trx('Users').where('UserName', UserName).del();
        await trx('auth').where('UserName', UserName).del();
        await trx.commit();
        return true;

    } catch(err){
        await trx.rollback();
        throw err;
    }
}

export const updateNameById = async(id:number, newUserName: string):Promise<boolean> =>{
    const isUpdated:boolean = await db('users').where('Id', id).update({Name: newUserName});
    return isUpdated;
}