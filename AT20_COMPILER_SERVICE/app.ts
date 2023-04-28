import express from 'express';
import dotenv from 'dotenv';

const upload = require('./src/routes/upload');
const user = require('./src/routes/user');

import { Request, Response } from 'express';

const app = express();
dotenv.config();

app.get('/api/v1/', (req: Request, res: Response) => {
    res.send('hello world');
});

// Routes
app.use('/api/v1/upload', upload);
app.use('/api/v1/user', user);

const port: number = parseInt(process.env.PORT as string, 10) || 9090;

app.listen(port, () => {
    console.log('The app is online');
});