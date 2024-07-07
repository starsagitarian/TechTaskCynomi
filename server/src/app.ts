import express, { Express, Request, Response } from 'express';
import { configureAWS } from './config/aws-config';


configureAWS();

const app: Express = express();
app.use(express.json());



export default app;