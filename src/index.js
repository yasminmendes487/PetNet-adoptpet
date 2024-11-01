import express from "express";
import { router } from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(" O servidor está funcionando.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
