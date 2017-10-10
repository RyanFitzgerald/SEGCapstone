/*
  Photo Controller
  - This file contains all the backend API logic for project photos
*/
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerPhotoOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');

    if (isPhoto) {
      next(null, true);
    } else {
      next({message: 'That filetype is not allowed!'}, false);
    }
  }
};

exports.uploadPhoto = multer(multerPhotoOptions).single('photo');

exports.resize = async (req, res, next) => {
  // Check if no new file to resize
  if (!req.file) {
    next(); // Skip to next middleware
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  
  // Now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./client/public/uploads/photos/${req.body.photo}`);

  // Once written to filesystem, keep going
  next();
};

exports.addPhoto = async (req, res) => {
  const photo = await (new Photo(req.body)).save();
  res.send(photo);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.photo);
  photo.remove();
  res.send(true);
};