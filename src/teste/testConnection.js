import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();


async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    await prisma.$disconnect(); 
    process.exit(1); 
  }
}


async function getUsers() {
  try {
    const users = await prisma.usuario.findMany();
    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    throw error;
  }
}


async function getUserById(id) {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true, tipo: true }, 
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
    throw error;
  }
}


async function testConnection() {
  await connectToDatabase();

  try {
    
    const result = await getUsers();
    console.log(result); 

    const user = await getUserById(1); 
    console.log(user); 

  } catch (error) {
    console.error('Erro durante o teste de conexão ou consulta:', error.message);
  } finally {
    await prisma.$disconnect(); 
  }
}

// Executando o teste
testConnection();
