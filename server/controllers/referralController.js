/*
  Referrals Controller
  - This file contains all the backend API logic for project referrals
*/

const mongoose = require('mongoose');
const Referral = mongoose.model('Referral');

exports.getReferrals = async (req, res) => {
  const referrals = await Referral.find();
  res.send(referrals);
};

exports.addReferral = async (req, res) => {
  const referral = await (new Referral(req.body)).save();
  res.send(referral);
};

exports.deleteReferral = async (req, res) => {
  const referral = await Referral.findById(req.params.id);
  referral.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});
};