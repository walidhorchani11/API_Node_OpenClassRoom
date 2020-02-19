const User = require('../models/user');
const bcrypt = require('bcrypt');
//impoter jsowebtoken pour creer un token lors du login 
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then( hash =>{
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save()
        .then(()=> res.status(201).json({message: 'User created'}))
        .catch(error => res.status(400).json({error: error}));
    })
    .catch(error => res.status(500).json({error: error}));
};


exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({error: 'user not found !'})
      }
      //si user exist, on campare le mdp entree avec lenregistre au bdd
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid){
            return res.status(401).json({error: 'mot de passe incorrect !'})
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {userId: user._id},
              'WalidHorchani_Token_secret_string',
              {expiresIn: '24h'}
            )
          })
        })
        //error au niveau du package pour la comparaison 
        .catch(error => res.status(500).json({error}))
    })
    //si il ya error pas dans le cas ou le user nexiste pasc tres au niveau de then
    .catch(error => res.status(500).json({error}));
};
