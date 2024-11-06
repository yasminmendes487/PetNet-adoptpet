
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Altere para o seu banco de dados, se necessário
  logging: false,
  timezone: '-03:00', // Ajuste para o horário de Brasília
});

export default sequelize; // Exportação padrão
