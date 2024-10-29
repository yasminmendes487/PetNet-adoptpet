import express from "express";
import { PrismaClient }  from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema de adoção de pets!');
});

// Servidor configurado
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
