import express from 'express';
import dotenv from 'dotenv';
import urlRouter from './routes/urlRouter.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', urlRouter);
app.use('/user', userRouter);
app.listen( PORT, () => { console.log(`listening on ${PORT}`)});