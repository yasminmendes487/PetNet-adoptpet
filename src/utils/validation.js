import bcrypt from "bcryptjs";

// Função de validação de email e senha
const validateEmailAndPassword = (email, senha, req, res) => {
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }
  return true;
};

// Função de validação de campos de usuário (email e senha)
const validateFields = (user, req, res) => {
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const { email, senha } = req.body;


  if (user.email !== email) {
    return res.status(400).json({ message: "Email ou senha inválidos." });
  }

 
  const senhaValida = bcrypt.compareSync(senha, user.senha);
  if (!senhaValida) {
    return res.status(400).json({ message: "Email ou senha inválidos." });
  }

  return true;
};

export { validateEmailAndPassword, validateFields };
