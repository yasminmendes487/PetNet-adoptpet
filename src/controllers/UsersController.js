import generateToken from "../utils/token.js";
import UsersService from "../services/users.service.js";

const validateEmailAndPassword = (req, res) => {
  const { email, senha } = req;
  if (!email || !senha) {
    res
    .status(400)
    .json({ message: 'Some required fields are missing' });
    return false;
  }
  return true;
};

const validateFields = (user, req, res) => {
  const { email, senha } = req.body;
  
    if (!user || user.senha !== senha || user.email !== email) {
      res
      .status(400)
      .json({ message: 'Invalid fields' });
      return false;
    }

    return true;
};

const usersService = new UsersService();

export default class UsersController {
  login = async (req, res) => {
    const { email } = req.body;
    try {
      if (!validateEmailAndPassword(req.body, res)) return;
  
      const user = await UsersService.getByEmail(email);
      if (!validateFields(user, req, res)) return;
  
      const token = generateToken(user);
  
      return res.status(200).json({ token });    
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, other: "oie" });
    }
  };
  
  async createUser(req, res) {
    try {
      const newUser = await usersService.createUser(req.body);
      const token = generateToken(newUser.id);
      return res.status(201).json({ token });
    } catch (error) {
      return res
      .status(500)
      .json({ message: error.message });
  }
  };
}
