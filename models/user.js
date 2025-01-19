'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {timestamps: false});
  User.associate = function(models) {};
  return User;
};