import express from 'express';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import storyRouter from './routes/storyRoute';
import likeRouter from './routes/likeRoute';
import commentRouter from './routes/commentRoute';
import { ENV } from './config/conf';
import { handleGlobalError } from './utils/errorHandler';
import cors from 'cors'

const app = express();
const port = ENV.Port || 3000;
app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use('/api/users', userRouter.router);
app.use('/api/auth', authRouter.router);
app.use('/api/story', storyRouter.router);
app.use('/api/like', likeRouter.router);
app.use('/api/comment', commentRouter.router);

app.use(handleGlobalError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server connected at ' + port + ' ' + process.env.port);
});
