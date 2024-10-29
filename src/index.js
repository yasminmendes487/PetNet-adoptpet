import express from "express";
import { router } from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

// Servidor configurado
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
