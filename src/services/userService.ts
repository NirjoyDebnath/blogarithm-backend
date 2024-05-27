import express, {Request, Response, NextFunction} from 'express'
import { userInputType } from '../interfaces/user'
import * as userRepository from '../repositories/userRepository';




// export const getAllUsers = async():Promise<userType[]> =>{

// }

export const insertUser = async(user: userInputType):Promise<userInputType> =>{
    const newUser = await userRepository.insertUser(user);
    console.log(newUser)
    return newUser;
}