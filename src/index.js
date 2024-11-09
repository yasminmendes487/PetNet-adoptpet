import express from "express";
import { router } from "./routes/index.js"; 
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api', router);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
