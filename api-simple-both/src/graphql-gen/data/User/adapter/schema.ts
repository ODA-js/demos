import * as Sequelize from 'sequelize';
import { IdGenerator } from 'oda-isomorfic';

export default (sequelize, DataTypes: Sequelize.DataTypes) => {
  let $User = sequelize.define('User', {
    id: {
      type: DataTypes.CHAR(24), defaultValue: ()=> IdGenerator.generateMongoId(),
      primaryKey: true,
    },

    userName: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
      tableName: 'users',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      underscored: false,
      indexes: [{
        unique: true,
        fields: [
          { attribute: 'userName', order: 'ASC' },
        ],
      }]
    });

  return $User;
};
