'use strict';
const { encrypt } = require('../helper/bycript')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TodoUser, {foreignKey : 'user_id', targetKey: 'id'})
      User.hasMany(models.Todo, {foreignKey : 'user_id', targetKey: 'id'})
    }
  };
  User.init({
    full_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          type: true,
          msg: 'Email Missing'
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          type: true,
          msg: 'Username Missing'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          type: true,
          msg: 'Password Missing'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    if (!user.full_name) {
      user.full_name = user.username
    }
  })

  User.beforeCreate((user, options) => {
    user.password = encrypt(user.password)
  })
  return User;
};