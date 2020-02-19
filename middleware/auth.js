const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

  //dans le block try pour s assurer que si nous avons une erreur le code ne plante pas mais il catch l erreur et on fait ce qu'on veut par exp l afficher 
  try{
    //recuperer le token sans bearer a partir du header autorisation du requet
    const token = req.headers.authorization.split(' ')[1];
    
    //decoder le token 
    const decodedToken = jwt.verify(token, 'WalidHorchani_Token_secret_string');
    console.log(decodedToken); 
    

    //recuperer user id qui est deja encoder (payload)
    const userId = decodedToken.userId;

    
    //si on a un userId dans la requete, on va le verifier avec celle du token 
    if(req.body.userId && req.body.userId !== userId){
      console.log('inside block if');
      throw 'User Id non valable';
    }else{
      //puisque ce middleware va etre execute avant le middleware du route , on va utiliser next pour passer au middleware suivant si tous est ok
      console.log('to next middleware');
      next()
    }

  }catch (error) {
    console.log('in catch block', error);
    res.status(401).json({error: error | 'Requete non authentifie'})
  }
}
