import express, { Express } from 'express';
import userDataRoutes from './routes/userDataRoutes';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userDataRoutes);

export default app;