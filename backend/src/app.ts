import express from 'express'
import appRouter from './routes/index.js';
import {config} from 'dotenv'
import morgan from 'morgan'

config();

const app = express();

app.use(express.json());

// remove once application is built
app.use(morgan("dev"));

app.use("/api/v1", appRouter);


export default app;