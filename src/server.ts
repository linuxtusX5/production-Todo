import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import DB from '../config/connectionDB';
import router from './routes';

dotenv.config();
DB();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(express.json());

app.use('/api/v1/user', router());

const PORT = process.env.PORT || 8080
//Listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`)
})

