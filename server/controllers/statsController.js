/*
  Stats Controller
  - This file contains all the backend API logic for stats
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Client = mongoose.model('Client');

exports.getTotal = async (req, res) => {
  const filter = {};

  if (req.query.startDate) {
    if (filter.soldDate) {
      filter.soldDate.$gte = req.query.startDate;
    } else {
      filter.soldDate = {
        $gte: req.query.startDate
      };
    }
  }

  if (req.query.endDate) {
    if (filter.soldDate) {
      filter.soldDate.$lte = req.query.endDate;
    } else {
      filter.soldDate = {
        $lte: req.query.endDate
      };
    }   
  }

  if (req.query.postalCode) {
    filter.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  const total = await Project.find(filter).select('contractCost soldDate').where('contractCost').gt(0);
  res.send(total);
};

exports.getTotalByType = async (req, res) => {
  const filter = {};

  if (req.query.startDate) {
    if (filter.soldDate) {
      filter.soldDate.$gte = req.query.startDate;
    } else {
      filter.soldDate = {
        $gte: req.query.startDate
      };
    }
  }

  if (req.query.endDate) {
    if (filter.soldDate) {
      filter.soldDate.$lte = req.query.endDate;
    } else {
      filter.soldDate = {
        $lte: req.query.endDate
      };
    }   
  }

  if (req.query.postalCode) {
    filter.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  const total = await Project.find(filter).populate('type').select('contractCost soldDate type').where('contractCost').gt(0);
  res.send(total);
};

exports.getTotalBySalesman = async (req, res) => {
  const filter = [{
    path: 'projects',
    model: 'Project',
    select: 'contractCost soldDate',
    match: { contractCost: { $gt: 0 } }
  }, {
    path: 'soldBy',
    model: 'User'
  }];

  if (req.query.startDate) {
    if (filter[0].match.soldDate) {
      filter[0].match.soldDate.$gte = req.query.startDate;
    } else {
      filter[0].match.soldDate = {
        $gte: req.query.startDate
      };
    }
  }

  if (req.query.endDate) {
    if (filter[0].match.soldDate) {
      filter[0].match.soldDate.$lte = req.query.endDate;
    } else {
      filter[0].match.soldDate = {
        $lte: req.query.endDate
      };
    }
  }

  if (req.query.postalCode) {
    filter[0].match.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  const total = await Client
    .find()
    .populate(filter)
    .select('soldBy, projects');

  res.send(total);
};

exports.getTotalByReferral = async (req, res) => {
  const filter = [{
    path: 'projects',
    model: 'Project',
    select: 'contractCost soldDate',
    match: { contractCost: { $gt: 0 } }
  }, {
    path: 'referral',
    model: 'Referral'
  }];

  if (req.query.startDate) {
    if (filter[0].match.soldDate) {
      filter[0].match.soldDate.$gte = req.query.startDate;
    } else {
      filter[0].match.soldDate = {
        $gte: req.query.startDate
      };
    }
  }

  if (req.query.endDate) {
    if (filter[0].match.soldDate) {
      filter[0].match.soldDate.$lte = req.query.endDate;
    } else {
      filter[0].match.soldDate = {
        $lte: req.query.endDate
      };
    }
  }

  if (req.query.postalCode) {
    filter[0].match.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  const total = await Client
    .find()
    .populate(filter)
    .select('soldBy, projects');

  res.send(total);
};