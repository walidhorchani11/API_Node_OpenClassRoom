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


app.use('/api/stuff', (req, res, next) => {
  Thing.find().then(things => {res.status(200).json(things)}).catch(error => {res.status(400).json({error})})
});

//middleware
app.use((req, res, next) => {
  console.log('requete recus ...');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
})


app.use((req, res, next) => {
  res.json({message: 'voici le retour de notre application express...'})
});

app.use((req, res) => {
  console.log('reponse retourné ....');
})

module.exports = app;
