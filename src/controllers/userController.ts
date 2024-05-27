import express, {Request, Response, NextFunction} from 'express'

export const getAllUsers = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    console.log('Hit on the getall user')
    res.send('Request received on get all users')
    /////////////
}

export const insertUser = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    console.log('Hit on the insert user')
    res.send('Request received in insert user')
    /////////////
}

