import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Adotante extends Model {}

Adotante.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
    },
    endereco: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: 'Adotante',
    tableName: 'adotantes',
    timestamps: true,
});

export default Adotante;


