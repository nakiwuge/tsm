const { RESTDataSource } = require('apollo-datasource-rest');

class ShowsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.tvmaze.com/';
  }
  async getAllShows() {
    const shows = await this.get('shows');
    return  shows.map(async show =>  this.formatShows(show));
  }

  formatShows(show) {
   
    return {
      id:show.id,
      name:show.name,
      url:show.url,
      genres:show.genres,
      status:show.status,
      image:show.image.original, 
    };
  }

  formatCrew(crew){

    return crew.map((result)=>({
      id:result.person.id,
      name:result.person.name,
      image:result.person.image&&result.person.image.original,
      type:result.type
    }));
  }

  formatSeasons(seasons){
  
    return seasons.map((result)=>({
      id:result.id,
      url:result.url,
      number:result.number,
    }));
  }

  formatImages(images){
  
    return images.map((result)=>({
 
      url:result.resolutions.original.url,
    }));
  }
  
  async getOneShow(id) {
    const response = await this.get(`shows/${id}?embed[]=crew&embed[]=seasons&embed[]=images`);
    const { crew,seasons,images }=response._embedded;
    return {
      ...this.formatShows(response),
      crew:this.formatCrew(crew),
      seasons:this.formatSeasons(seasons),
      gallery:this.formatImages(images)
    };
  } 
}

module.exports = ShowsApi;