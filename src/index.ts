import express from 'express';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import { ENV } from './config/conf';
import { globalErrorHandler } from './utils/errorHandler';

const app = express();
const port = ENV.Port || 3000;
app.use(express.json({ limit: '50kb' }));
app.use('/api/users', userRouter.router);
app.use('/api/auth', authRouter.router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message, error: err });
// });

app.use(globalErrorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server connected at ' + port + ' ' + process.env.port);
});
