import express, {Request, Response, NextFunction} from 'express'
import * as userService from '../services/userService'
import { userType } from '../interfaces/user'

export const getAllUsers = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try{
        const users: userType[] = await userService.getAllUsers();
        res.json(users);
    } catch(err){
        console.log('User der pai nai')
        next(err)
    }
}

export const insertUser = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try{
        const userInfo = req.body
        const user = await userService.insertUser(userInfo)
        res.json(userInfo)
    } catch (err){
        console.log('Insert hoy nai')
        next(err)
    }
    console.log('Hit on the insert user')
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    try{
        await userService.deleteUser(req.body.UserName)
        res.json({status: 'Deleted'})
    } catch(err){
        console.log('User delete hoy nai')
        next(err)
    }
}

