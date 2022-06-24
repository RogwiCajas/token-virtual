var express = require('express');
var router = express.Router();
const tokenModel = require("../models/token_info");

//jwt
const jwt = require('jsonwebtoken');

/* GET token test */
router.get('/', async function(req, res, next) {
  await tokenModel.findAll().then(
    (data) => {
        res.send({token: data}); 
    }
  ).catch((err) => {
      res.send({error: err});
  })
});

/**
 * Endpoint de integración sea consumido por el frontend y tenga la autogeneración
cada 60 segundos.
 */
router.get('/generarToken/:usuario', async function(req, res, next) {
  //genera el token pra un usuario, el token tiene vida util de 60 seg
  let usuario = req.params.usuario;
  //firma del token para ese usuario con duracion de 60 s
  const token =  jwt.sign({usuario}, 'secret_key', {expiresIn: "60s"})
  //guardar registro en base
  try {
    let creacion = await  tokenModel.create({
      token: token,
      usuario: usuario,
      fecha_creacion: new Date(),
    });
    await creacion.save();
    //enviar  token de regreso al cliente
    res.send({usuario: usuario, token_60s: token});
  } catch (error) {
    res.send({error: error});
  }
  
  
});

/**
 * Endpoint el cual sea consumido desde Postman para simular la autenticación.
 */
router.get('/usarToken/:usuario/:token', verificar, async function(req, res, next) {
  //una vez se pasa el middleware de authenticacion,
  //el usuario podra acceder a esta variable, antes de que culminen los 60 s
  const dataProtegida = "Información Valiosa";
  res.send({data: dataProtegida})
});

/*
*funcion middleware localizada aqui por facilidad 
*/
function verificar(req, res, next){
  //obtenemos el usuario y el token con el que desea autenticarse
  let usuario = req.params.usuario;
  let token = req.params.token;

  if(token == null || usuario == null) return res.send({status: "403", msg: "Acceso denegado"});

  jwt.verify(token, "secret_key", (err, user) => {
    if(err) return res.send({status: "404", msg: "Acceso denegado: no existe un usuario asociado a ese token (caducó)"});
    //avanza al endpoint ya que el token es valido
    req.user = user;
    next();
  })
}

module.exports = router;
