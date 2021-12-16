import './setup';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import connectDatabase from './database';

import examRouter from './routers/examRouter';

export async function init() {
	await connectDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/leites', examRouter);

export default app;
