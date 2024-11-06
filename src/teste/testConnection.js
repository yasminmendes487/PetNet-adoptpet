import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('Conexão com o banco de dados bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();

