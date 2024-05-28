import { userType } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';

export const getAllUsers = async():Promise<userType[]> =>{
    return userRepository.getAllUsers();
}

export const deleteUser = async(id:number):Promise<void> =>{
    const deleteId: number = await userRepository.deleteUser(id);
    if(!deleteId){
        throw new Error('Delete unsuccessful');
    }
}

export const updateNameById = async (id: number, newUserName: string):Promise<boolean> =>{
    const isUpdated:boolean = await userRepository.updateNameById(id, newUserName);
    if(!isUpdated){
        throw new Error('Not Updated')
    }
    return isUpdated;
}