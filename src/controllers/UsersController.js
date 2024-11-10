//src/Controller/UsersController.js
import generateToken from "../utils/token.js";
import UsersService from "../services/users.service.js";
import {
  validateEmailAndPassword,
  validateFields,
} from "../utils/validation.js";

const usersService = new UsersService();

export default class UsersController {
  async login(req, res) {
    const { email, senha } = req.body;

    if (!validarEmail(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }

    try {
      if (!validateEmailAndPassword(email, senha, req, res)) {
        return 
          
      }

      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (!validateFields(user, senha)) {
        return res.status(400).json({ message: "Email ou senha inválidos" });
      }

      const token = generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no processo de login", error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await usersService.createUser(req.body);

      const token = generateToken(newUser.id);

      return res.status(201).json({ token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro na criação do usuário", error: error.message });
    }
  }

  async findUserById(req, res) {
    const { id } = req.params;

    try {
      const usuario = await usersService.getUserById(id, {
        senha: false,
      });

      if (usuario) {
        return res.status(200).json(usuario);
      } else {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar usuário", message: error.message });
    }
  }


  // MARK: - Todos os usuários
  async getAllUsers(req, res) {
    try {
      const usuarios = await usersService.getAllUsers();

      if (usuarios && usuarios.length > 0) {
        return res.status(200).json(usuarios);
      } else {
        return res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
    }
  }
}
