import dotenv from 'dotenv';
import app from './app';
import { configureAWS } from './config/aws-config';

dotenv.config();
configureAWS();

const port: string | number = process.env.PORT || 3054;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});