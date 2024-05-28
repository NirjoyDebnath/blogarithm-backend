import { userType } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';

export const getAllUsers = async():Promise<userType[]> =>{
    return userRepository.getAllUsers();
}

export const deleteUser = async(id:number):Promise<void> =>{
    const deleteId = await userRepository.deleteUser(id);
    if(!deleteId){
        throw new Error('Delete unsuccessful');
    }
}