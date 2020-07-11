module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
  }, {});
  
  return User;
};