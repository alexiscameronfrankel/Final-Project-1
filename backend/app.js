//This file gets ran at all times in backend
//consist of dependencies installed for backend functionality
//has middleware accessible from dependencies
//Runs files in route folder vs having routes all in here (*order matters as it will look for first instance of match)

require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');


//Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ironplate'
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fgianoli:frenchy10@cluster0-5csts.mongodb.net/test?retryWrites=true&w=majority'
console.log('Connecting DB to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

//No use
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

//new instance of express
//middleware
const app = express();
//
app.use(
  //CORs (Cross Origin Request) helps with authentication; package downloaded and imported
  //CORS is used for authencation of an app making rquest to other APIs/backends
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://yumyumyum.netlify.app","https://boxofrecipes.herokuapp.com"] //Swap this with the client url 
  })
);


// app.use(cors({
//   origin: function(origin, callback){
//     return callback(null, true);
//   },
//   optionsSuccessStatus: 200,
//   credentials: true
// }));


//More middleware; session was downloaded & imported 
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

//More middleware; passport used for user authentication 
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
//Joins frontend directory to backend allowing communication
app.use(express.static(path.join(__dirname, '../frontend/build')))
//installed dependencies middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

// all routes organized into smaller files
const index = require('./routes/index');
const auth = require('./routes/auth');
const recipe = require('./routes/recipe');
const profile = require('./routes/profile');
const comment = require('./routes/comment');
app.use('/', index);
app.use('/auth', auth);
app.use('/recipe', recipe);
app.use('/profile', profile);
app.use('/comment', comment);
app.use('/api', require('./routes/file-upload-route')); //route to image upload js

// Uncomment this line for production
let client = path.join(__dirname + '../public/index.html')
console.log('client',client)
//app.get('*', (req, res) => res.sendFile(client));
// For any other routes, redirect to the index.html file of React
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })
module.exports = app;
