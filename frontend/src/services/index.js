import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = 'https://new-applicatio.herokuapp.com')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  },
  newRecipe: async (recipe) => {
    return await service.post('/recipe/new', recipe)
  },
  updateRecipe: async (recipe) => {
    return await service.post('/recipe/update', recipe)
  },
  findRecipe: async (recipe) => {
    return await service.post('/recipe/findOne', recipe)
  },
  deleteRecipe: async (recipe) => {
    return await service.post('/recipe/delete', recipe)
  },
};

export default actions;
