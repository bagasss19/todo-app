'use strict';
const { types } = require('pg');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    dateFormat () {
      let date = new Date(this.deadline).getDate()
      let month = new Date(this.deadline).getMonth()
      let year = new Date(this.deadline).getFullYear()

      if (month < 10) {
        return `${year}-0${month}-${date}`  
      }
      return `${year}-${month}-${date}`
    }


    static associate(models) {
      // define association here
      Todo.hasMany(models.TodoUser, {foreignKey : 'todo_id', targetKey: 'id'})
      Todo.belongsTo(models.User,{foreignKey : 'user_id', targetKey: 'id'})
    }
  };
  Todo.init({
    task: { 
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          type : true,
          msg : 'name cannot be empty!'
        }
      }
    },
    deadline: { 
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          type : true,
          msg : 'deadline cannot be empty!'
        }
      }
    },
    isCompleted: DataTypes.BOOLEAN,
    user_id : DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((user, options) => {
    user.isCompleted = false
    user.completedAt = null
  })
  return Todo;
};