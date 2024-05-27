import express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import db from './databaseConnection/db'
import userRouter from './routes/userRoute'
import {userType} from './interfaces/user'

dotenv.config();

const app = express();
const port = process.env.port || 3000;


app.use(express.json());
app.use('/api/users', userRouter.router)


app.get('/', async(req: Request, res: Response) =>{
    try{
        const users: userType[] = await db('Users').select('*');
        res.json(users);
    } catch (err){
        res.status(500).json({error: err})
    }
})

app.use((err:Error, req:Request, res: Response, next: NextFunction) =>{
    res.status(500).json({error: err.message})
})

app.listen(port, () =>{
    console.log('Server connected at ' + port + ' ' +process.env.port);
});