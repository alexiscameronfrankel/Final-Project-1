import axios from 'axios';

let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = 'https://boxofrecipes.herokuapp.com')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  async handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/api/upload', theFile)
      .then(res => console.log(res.data))
      .catch(errorHandler);
  },

  async handleUploadVideo (theFile) {
    console.log('file in service: ', theFile)
    return service.post('/api/uploadvideo', theFile)
    .then(res => console.log(res.data))
      .catch(errorHandler);
  },

//below will save the entire recipe and POST it to MongoDB


  async saveNewThing (recipe) {
    console.log('new thing is: ', recipe)
    return service.post('/api/recipe/create', recipe)
    .then(res => console.log(res.data))
      .catch(errorHandler);
  }

}