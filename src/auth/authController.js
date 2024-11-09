// Controladores para autenticação (login, registro)
import { registrarUsuario, autenticarUsuario } from "./authService";

export const registrar = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    const novoUsuario = await registrarUsuario(nome, email, senha, tipo);

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await autenticarUsuario(email, senha);

    res.status(200).json({
      message: "Usúario autenticado com sucesso!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
