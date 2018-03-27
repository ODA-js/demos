import * as Sequelize from 'sequelize';
import { IdGenerator } from 'oda-isomorfic';

export default (sequelize, DataTypes: Sequelize.DataTypes) => {
  let $ToDoItem = sequelize.define('ToDoItem', {
    id: {
      type: DataTypes.CHAR(24), defaultValue: ()=> IdGenerator.generateMongoId(),
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    dueToDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  }, {
      tableName: 'todoitems',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      underscored: false,
      indexes: [{
        fields: [
          { attribute: 'name', order: 'ASC' },
        ],
      }, {
        fields: [
          { attribute: 'description', order: 'ASC' },
        ],
      }, {
        fields: [
          { attribute: 'done', order: 'ASC' },
        ],
      }, {
        fields: [
          { attribute: 'dueToDate', order: 'ASC' },
        ],
      }, {
        fields: [
          { attribute: 'published', order: 'ASC' },
        ],
      }, {
        fields: [
          { attribute: 'user', order: 'ASC' },
        ],
      }]
    });

  return $ToDoItem;
};
