const express = require('express');

const app = express();

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
