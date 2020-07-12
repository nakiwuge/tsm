const { Sequelize } = require('sequelize');

const Modals = () => {
  const db = new Sequelize('database', 'username', 'password'{
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
  
  const User = db.define('user', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true
    },
    password: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt:  { 
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
   },
    updatedAt: Sequelize.DATE,
  }
  );
  
  const WatchList = db.define('watchlist', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        unique: true,
        autoIncrement:true
      },
    showId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    createdAt: { 
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
   },
    updatedAt: Sequelize.DATE,
  });
  
  return { db, User, WatchList };
};

module.exports = Modals;