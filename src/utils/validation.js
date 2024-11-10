import bcrypt from "bcryptjs";

const validateEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  return regex.test(email);
};


const validateEmailAndPassword = (email, senha, req, res) => {
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }
  return true;
};

const validateFields = async (user, senha) => {
  if (!user) {
    return { valid: false, message: "Usuário não encontrado." };
  }

  // NOTE: email do usuário corresponde ao email fornecido
  if (user.email !== user.email) {
    return { valid: false, message: "Email ou senha inválidos." };
  }

  // Note: verifica se a senha fornecida corresponde à senha armazenada
  const senhaValida = await bcrypt.compare(senha, user.senha); // Usando bcrypt.compare assíncrono
  if (!senhaValida) {
    return { valid: false, message: "Email ou senha inválidos." };
  }

  return { valid: true };
};

export { validateEmail, validateEmailAndPassword, validateFields };
