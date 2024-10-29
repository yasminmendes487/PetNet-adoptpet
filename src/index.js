import express from "express";
import { router } from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Sistema de Adoção de Pets! O servidor está funcionando.");
});

// Servidor configurado
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
