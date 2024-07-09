import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port: string | number = process.env.PORT || 3054;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});