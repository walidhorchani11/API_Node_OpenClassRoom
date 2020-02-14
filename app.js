const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();
mongoose.connect('mongodb+srv://walidhorchani:ran08742242@cluster0-mqctn.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,
useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//avoid cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//use body parser pour avoir body de la demande (requete)
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('requete recus ...');
  next();
});


app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  console.log(req.body);
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => {res.status(201).json({
      message: 'Objet cree avec success'
    });
  }).catch((error)=>{
    res.status(400).json({
      error
    });
  })
  
  
});


app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(thing => {res.status(200).json(thing)})
    .catch(error => {res.status(400).json({error})})
});

app.get('/api/stuff', (req, res, next) => {
  Thing.find().then(things => {res.status(200).json(things)}).catch(error => {res.status(400).json({error})})
});

app.delete('/api/stuff/:id',(req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'deleted succes !'})})
    .catch(error => {res.status(400).json(error)});
})

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id} )
    .then(() =>  res.status(200).json({message: 'Objet modifié !!'}))
    .catch(error => res.status(400).json({error}));
});

module.exports = app;
