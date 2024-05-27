import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import db from './databaseConnection/db'
import userRouter from './routes/userRoute'

dotenv.config();

const app = express();
const port = process.env.port || 3000;


app.use(express.json());
app.use('/api/users', userRouter.router)

interface userType {
    Id:number,
    UserName: string,
    Email: string,
    Password: string,
}

app.get('/', async(req: Request, res: Response) =>{
    try{
        const users: userType[] = await db('Users').select('*');
        res.json(users);
    } catch (err){
        res.status(500).json({error: err})
    }
})

app.listen(port, () =>{
    console.log('Server connected at ' + port + ' ' +process.env.port);
});