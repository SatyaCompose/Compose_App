import express from 'express';
import dotenv from 'dotenv';
import allowCors from './common/cors';
import { connectDB } from './config';
import routes from './routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(allowCors);

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

connectDB();

routes.forEach((route) => {
    app.use(route.path, route.router);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});