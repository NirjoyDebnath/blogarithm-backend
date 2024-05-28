import { userType } from "../interfaces/user"
import db from './../databaseConnection/db'

// export const insertUser = async(user:userInputType):Promise<userInputType> =>{
//     try{
//         const [newUser] = await db<userInputType>('Users').insert(user).returning('*')
//         console.log(newUser)
//         return newUser;
//     }
//     catch(err){
//         console.log('error repository te')
//         if(err instanceof Error){
//             console.log(err.message)
//             throw new Error(err.message);
//         }
//         throw new Error('Could not insert')
//     }
// }

// export const insertUser = async(user:userInputType):Promise<userInputType> =>{
//     const [newUser] = await db<userInputType>('Users').insert(user).returning('*')
//     console.log(newUser)
//     return newUser;
// }

export const getAllUsers = async():Promise<userType[]> => {
    const users:userType[] = await db<userType>('Users').select('*');
    return users;
}

export const deleteUser = async(id:number):Promise<number> =>{

    const trx = await db.transaction();

    try{
        const user = await trx<userType>('Users').select('*').where('Id', id).first();
        if(!user){
            throw new Error('No such user')
        }
        await trx('Users').where('UserName', user.UserName).del();
        await trx('auth').where('UserName', user.UserName).del();
        await trx.commit()
        return 1;

    } catch(err){
        await trx.rollback()
        throw err
    }
}