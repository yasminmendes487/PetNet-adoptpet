// rotas de autenticação e middleware de admin
import express from "express";
import authRoutes from "./routes/authRoutes";
import {
  verificarAutenticacao,
  verificarAdmin,
} from "./middleware/authMiddleware";

const app = express();

app.use(express.json());

// Rota de autenticação
app.use("/auth", authRoutes);

app.use("/admin", verificarAutenticacao, verificarAdmin, (req, res) => {
  return res
    .status(200)
    .json({ message: "Bem-vindo ao painel de administração!" });
});

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint não encontrado." });
});

export default app;
