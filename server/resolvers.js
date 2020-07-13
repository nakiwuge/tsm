const { paginate } = require('./utils');

module.exports = {
  Query: {
    shows: async (_, { pageSize = 20, after }, { dataSources }) => {
      const shows = await dataSources.ShowApi.getAllShows();

      const data = paginate({
        after,
        pageSize,
        results: shows
      });
      return {
        shows:data,
        cursor: data.length ? data[data.length - 1].cursor : null,

        hasMore: data.length
          ? data[data.length - 1].cursor !==
            shows[shows.length - 1].cursor
          : false
      };
    },
    show: async (_, { id }, { dataSources }) =>{
      const data = await dataSources.ShowApi.getOneShow(id);
      return data;
    }  ,
    scheduledShows: async (_, {}, { dataSources }) =>{
      const shows= [];
      const results = await dataSources.UserApi.getSheduledShows();

      for (const id of results) {
        const data = await dataSources.ShowApi.getOneShow(id);
        if(data){
          shows.push(data);
        }
      }
      return shows;
    }  
  },
  Mutation:{
    signup:async (_,{ email,password,confirmPassword }, { dataSources })=>{
      if (password!==confirmPassword){
        return { success:false, error:'Passwords do not match' };
      }
  
      const data = await dataSources.UserApi.addUser({ email,password });
  
      return  data.error?{ success:false, error:data.error }:{ ...data, success:true };
    },
    login:async (_,{ email,password }, { dataSources })=>{
      const data = await dataSources.UserApi.login({ email,password });

      return data.error?{ success:false, error:data.error }:{ ...data, success:true };
    },

    addToWatchlist:async (_,{ showId }, { dataSources })=>{
      const data = await dataSources.UserApi.sheduleShow(showId);

      return data.error?{ success:false, error:data.error }: { ...data, success:true };
    },

    removeShow:async (_,{ showId }, { dataSources })=>{
      const data = await dataSources.UserApi.removeShow(showId);

      return data.error?{ success:false, error:data.error }:{ ...data, success:true };
    },
  }
};