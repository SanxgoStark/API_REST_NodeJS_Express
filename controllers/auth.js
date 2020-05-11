'use strict'

/**
 * Constrolador que se va a encargar del registro
 * y autentificacion de usuarios en nuestro API-REST
 */

 const mongoose = require('mongoose')

 // Importando el modelo usuario
 const User = require('../models/user')

 const service = require('../services')

 // Creando funciones del controlador

 //Funcion de registro
 /**
  * Como son controladores de http y es tamos utilizando express reciben un obejeto 
  * request y response
  * 
  * no se agrega el password por qu ya se creo una funcion de encryptacion en el modelo
  */
 function signUp (req,res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,

    })

    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
 }


 // Funcion de registropara autentificacion una ves el usuario este registrado
 function signIn(req,res){

 }

 //Exportacion de modelos
 module.exports = {
     signUp,
     signIn
 }

