/*
  File Controller
  - This file contains all the backend API logic for project files
*/
const mongoose = require('mongoose');
const File = mongoose.model('File');
const multer = require('multer');
const fs = require('fs');
const uuid = require('uuid');

const multerFileOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');

    if (isPhoto) {
      next({message: 'That filetype is not allowed!'}, false); 
    } else {
      next(null, true);
    }
  }
};

exports.uploadFile = multer(multerFileOptions).single('file');

exports.write = async (req, res, next) => {
  // Check if no new file to resize
  if (!req.file) {
    next(); // Skip to next middleware
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.file = `${uuid.v4()}.${extension}`;
  
  // Now we write
  fs.writeFile(`./client/public/uploads/files/${req.body.file}`, req.file.buffer, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 

  // Once written to filesystem, keep going
  next();
};

exports.addFile = async (req, res) => {
  const file = await (new File(req.body)).save();
  res.send(file);
};

exports.deleteFile = async (req, res) => {
  const file = await File.findById(req.params.file);
  file.remove();
  res.send(true);
};