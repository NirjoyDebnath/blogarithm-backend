import { userInputType } from "../interfaces/user"
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

export const insertUser = async(user:userInputType):Promise<userInputType> =>{
    
        const [newUser] = await db<userInputType>('Users').insert(user).returning('*')
        console.log(newUser)
        return newUser;
    
    
}