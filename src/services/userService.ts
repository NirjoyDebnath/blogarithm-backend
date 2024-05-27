import express, {Request, Response, NextFunction} from 'express'
import { userInputType, userType } from '../interfaces/user'
import * as userRepository from '../repositories/userRepository';




export const getAllUsers = async():Promise<userType[]> =>{
    return userRepository.getAllUsers();
}

export const insertUser = async(user: userInputType):Promise<userInputType> =>{
    const newUser = await userRepository.insertUser(user);
    console.log(newUser)
    return newUser;
}

export const deleteUser = async(userName:string):Promise<void> =>{
    const deleteId = await userRepository.deleteUser(userName);
    if(!deleteId){
        throw new Error('Delete unsuccessful')
    }
}