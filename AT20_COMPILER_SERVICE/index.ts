import express from 'express';
import dotenv from 'dotenv';
import compiler from './src/routes/compiler_routes';
import cors  from 'cors'; 
const app = express();
dotenv.config();
app.use(cors());
app.use('/api/v1.0/compiler', compiler);

const PORT: number | string = process.env.PORT || 9292;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});  