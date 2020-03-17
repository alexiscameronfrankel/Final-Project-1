const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'thing-gallery', // The name of the folder in cloudinary
  params: {
    folder: 'foo',
    format: 'mp4',
    resource_type: 'video'
  }
  //allowedFormats: ['mp4', 'MOV'],
  // // this is in case you want to upload other type of files, not just images
  // resource_type: 'video', 
  // filename: function (req, res, cb) {
  //   cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  // }
});

const uploadervideo = multer({ storage });
module.exports = uploadervideo;