// src/index.js
import express from "express";
import { router } from "./routes/index.js"; // Importando o roteador

const app = express();
const PORT = 3000;

app.use(express.json()); // Para processar requisições com JSON
app.use(router); // Usando o roteador que inclui pets e adotantes

// Servidor configurado
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
