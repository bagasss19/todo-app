'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoUser.belongsTo(models.Todo, {foreignKey : 'todo_id', targetKey: 'id'})
      TodoUser.belongsTo(models.User, {foreignKey : 'user_id', targetKey: 'id'})
    }
  };
  TodoUser.init({
    todo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TodoUser',
  });
  return TodoUser;
};