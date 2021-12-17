import './setup';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import connectDatabase from './database';

import examRouter from './routers/examRouter';
import professorRouter from './routers/professorRouter';
import serverErrorMiddleware from './middlewares/serverErrorMiddleware';

export async function init() {
	await connectDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(examRouter);
app.use('/professors', professorRouter);
app.use(serverErrorMiddleware);

export default app;
