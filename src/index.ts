import express from 'express';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import storyRouter from './routes/storyRoute';
import { ENV } from './config/conf';
import { handleGlobalError } from './utils/errorHandler';

const app = express();
const port = ENV.Port || 3000;
app.use(express.json({ limit: '50kb' }));
app.use('/api/users', userRouter.router);
app.use('/api/auth', authRouter.router);
app.use('/api/story', storyRouter.router);

app.use(handleGlobalError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server connected at ' + port + ' ' + process.env.port);
});
