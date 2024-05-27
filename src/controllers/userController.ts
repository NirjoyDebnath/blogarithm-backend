import express, {Request, Response, NextFunction} from 'express'
import * as userService from '../services/userService'

export const getAllUsers = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    console.log('Hit on the getall user')
    res.send('Request received on get all users')
    /////////////
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
    //res.send('Request received in insert user')
    /////////////
}

