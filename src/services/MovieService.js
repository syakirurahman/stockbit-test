
/*
The benefit of separating API connections into different folder (services folder) will not felt in a small project like this. But in medium to large scale project with a lot of API endpoints, we can manage each API connection as a function with parameters.

The function parameters usually used to pass request body, request query params, or request auth configuration.

More details about folder structure used in this project: https://dev.to/syakirurahman/react-project-structure-best-practices-for-scalable-application-18kk

*/
import axios from 'axios';

const BASE_URL = "http://www.omdbapi.com/?apikey=faf7e5bb";

const MovieService = {
  search: async function(q, page = 1) {
    try {
      let url = BASE_URL+"&s="+q+"&page="+page;
      const response = await axios.get(url);
      return response.data;
    } catch(error) {
      throw error;
    }
  },

  getDetail: async function(id) {
    try {
      let url = BASE_URL+"&plot=full&i="+id;
      const response = await axios.get(url);
      return response.data;
    } catch(error) {
      throw error;
    }
  }

}

export default MovieService;