const User = require('../models/user');

exports.signup = (req, res, next) => {
  res.json({message: 'signup logic'})
};


exports.login = (req, res, next) => {
  res.json({message: 'login logic'})
};
