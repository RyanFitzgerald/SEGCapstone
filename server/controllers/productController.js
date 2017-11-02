/*
  Product Controller
  - This file contains all the backend API logic for project products
*/

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.addProduct = async (req, res) => {
  const product = await (new Product(req.body)).save();
  res.send(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.product);
  product.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});  
};