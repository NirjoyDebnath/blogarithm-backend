import express, { NextFunction, Request, Response } from 'express';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import storyRouter from './routes/storyRoute';
import { ENV } from './config/conf';

const app = express();
const port = ENV.Port || 3000;
app.use(express.json({ limit: '50kb' }));
app.use('/api/users', userRouter.router);
app.use('/api/auth', authRouter.router);
app.use('/api/story', storyRouter.router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log('Server connected at ' + port + ' ' + process.env.port);
});
