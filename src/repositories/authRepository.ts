import { signUpUserInfoType } from '../interfaces/user'
import { signUpAuthInfoType } from '../interfaces/auth'
import { userType } from '../interfaces/user'
import db from '../databaseConnection/db'
// import knex, {Knex} from 'knex'


export const signUp = async(userInfo: signUpUserInfoType, authInfo: signUpAuthInfoType):Promise<userType> =>{
    const trx = await db.transaction();
    // let userOutput: userType;
    // trx('Auth').insert(authInfo)
    //     .then((data) =>{
    //         return trx('User').insert(userInfo);
    //     })
    //     .then(([data]) =>{
    //         trx.commit()
    //         const user: userType = {Id: data, ...userInfo}
    //         userOutput = user;
    //         return user;
    //     })
    //     .catch((error) =>{
    //         trx.rollback()
    //         throw error;
    //     })
    // return userOutput
    try{
        await trx('Auth').insert(authInfo)
        const [Id] = await trx('Users').insert(userInfo)
            
        await trx.commit()

        const user: userType = {Id, ...userInfo}
        return user
    } catch(err){
        await trx.rollback()
        throw err
    }
    
}