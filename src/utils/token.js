import jwt from "jsonwebtoken";
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  return token;
};

export default generateToken;