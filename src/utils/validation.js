import { response } from "express";
import bcrypt from "bcryptjs";

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
  console.log("entro");
  const { email, senha } = req.body;
  const senhaValida = bcrypt.compareSync(senha, user.senha);

  if (!user) {
    return false;
  }

  if (user.email !== email) {
    return false;
  }

  if (!senhaValida ) {
    return false;
  }
  
    return true;
};


export { validateEmailAndPassword, validateFields }