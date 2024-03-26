import express from 'express';
import appRouter from './routes/index.js';
import { config } from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
config();
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove once application is built
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map