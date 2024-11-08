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

export { validateEmailAndPassword, validateFields }