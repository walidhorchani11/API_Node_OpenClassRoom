const Thing = require('../models/thing');
const fs = require('fs');

exports.creatThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    //url dinamyqy selon le serveur 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  //ou bien on peut faire comme ça et sans delete of _id
  // const thing = new Thing({
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   userId: req.body.userId,
  //   price: req.body.price,
  // });
  thing.save()
    .then(() => {res.status(201).json({
      message: 'Post saved successfully'
    });
  }).catch((error)=>{
    res.status(400).json({
      error
    });
  });
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
  .then(thing => {
    const fileName = thing.imageUrl.split('/images/')[1];
    fs.unlink(`images/${fileName}`, () => {
      Thing.deleteOne({_id: req.params.id})
      .then(() => {res.status(200).json({message: 'deleted succes !'})})
      .catch(error => {res.status(400).json(error)});
    });
    
  })
  .catch(error => res.status(500).json({error}));
};

exports.updateThing = (req, res, next) => {
  //ou bien au lieu de ...req.body on peut creer un new object 

    //test si file exist on met a jour le imageUrl
  const thingObj = req.file ? 
  {
    ...JSON.parse(req.body.thing),
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};

  Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id} )
    .then(() =>  res.status(200).json({message: 'Thing updated successfully'}))
    .catch(error => res.status(400).json({error}));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(thing => {res.status(200).json(thing)})
    .catch(error => {res.status(400).json({error})})
};

exports.getThings = (req, res, next) => {
  Thing.find().then(things => {res.status(200).json(things)}).catch(error => {res.status(400).json({error})})
};

