import { getData } from './db.js';
import { DataTypes } from 'sequelize';

const Child = getData.sequelizeClient.define('cat_childs', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    names: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    secondSurname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    }
}, {
    tableName: 'cat_childs',
    freezeTableName: true,
});

export const getChild = Child;