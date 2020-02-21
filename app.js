const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes =  require('./routes/stuff');
const authRoutes = require('./routes/user');
const path = require('path');

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


app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', authRoutes);


//on va enregistrer notre routeur pour toutes les demandes effectuees vers /api/stuff
app.use('/api/stuff', stuffRoutes);


module.exports = app;
