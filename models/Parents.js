import { getData } from './db.js';
import { getChild } from './Childs.js';
import { DataTypes } from 'sequelize';

const Parent = getData.sequelizeClient.define('cat_parents', {
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
    tableName: 'cat_parents',
    freezeTableName: true,
});

Parent.hasMany(getChild, {
    as: 'Hijos: ',
    foreignKey: 'parentId'
});
getChild.belongsTo(Parent, {
    as: 'parent'
})

export const getParent = Parent;