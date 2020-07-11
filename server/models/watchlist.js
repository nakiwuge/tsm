module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {
    showId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    isWatched:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  }, {});
  
  return WatchList;
};