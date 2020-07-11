const isEmail = require('isemail');
const { DataSource } = require('apollo-datasource');

class UserApi extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
  }

  initialize(config) {
    this.context = config.context;
  }

  async addUser(data) {
    const{ email,password } = data;
 
    if (!email || !isEmail.validate(email))  throw new Error('Invalid email');

    try {
      const user = await this.db.User.create({  email, password });
      return user.dataValues ;
    } catch (error) {
      throw new Error(error.message);

    }

  }


  async login(data) {
    const{ email,password } = data;

    if (!email || !isEmail.validate(email)) return { error:'Invalid email' };
    try {
      const user = await this.db.User.findAll({ where: { email, password } });

      if(user.length){
        // eslint-disable-next-line no-undef
        const token = Buffer.from(`${email},${user[0].dataValues.id}`).toString('base64');
        return { ...user[0].dataValues, token } ;
      }else{
        throw new Error('Wrong password or email');
      }
     
    } catch (error) {
      throw new Error(error.message);
    }

  }

  async sheduleShow(showId) {
    const userId = this.context.user &&this.context.user.id;
    if (!userId) throw new Error('Please login to perform this action');

    try {
      const isScheduled = await this.db.WatchList.findAll({ where: { showId,userId } });

      if(isScheduled.length) throw new Error('The show is already added to watch list');

      const show = await this.db.WatchList.create({ showId,userId });

      return show.dataValues;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeShow(showId) {
    const userId = this.context.user.id;
    if (!userId) throw new Error('Please login to perform this action');
    try {
      const show = await this.db.WatchList.destroy({
        where: {
          showId,
          userId
        }
      });

      return show?{ showId }:null;
    } catch (error) {
      throw new Error(error.message);

    }
    
  }

 
  async getSheduledShows() {
    const userId = this.context.user.id;
    console.log('userId',userId);
    if (!userId) throw new Error('Please login to perform this action');

    try {
      const shows = await this.db.WatchList.findAll({ where:{ userId } });

      console.log('kkkkk',shows);
      const showIds = [];
      for (const id of shows) {
        showIds.push(id.dataValues.showId);
          
      }
      return showIds;
        
    } catch (error) {
      throw new Error(error.message);

    }
 
  }


}
    
module.exports = UserApi;
