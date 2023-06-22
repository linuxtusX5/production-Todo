import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import DB from '../config/connectionDB';
import router from './routes';
import path from 'path';

dotenv.config();
DB();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(express.json());

app.use('/api/v1/user', router());
//static files
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

const PORT = process.env.PORT || 8080
//Listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`)
})

